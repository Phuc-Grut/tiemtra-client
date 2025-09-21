// src/hooks/useShippingFee.ts
import { useEffect, useMemo, useRef, useState } from "react";
import cartApi from "src/services/api/Cart";
import { District, Province, Ward } from "src/services/api/ProvinceAPI";
import { ICartItem } from "src/Interfaces/ICart";
import { FeeReqBase, GhnItem } from "src/Interfaces/IGHN";

type AddrParts = {
  province?: Province | null;
  district?: District | null;
  ward?: Ward | null;
};

type Options = {
  service_id?: number | null;
  insurance_value?: number | null;
  coupon?: string | null;
  // debounce ms khi người dùng thay đổi địa chỉ
  debounceMs?: number;
};

type ShippingFeeState = {
  fee: number | null;
  eta?: string | null; // tuỳ BE có trả về
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
};

export default function useShippingFee(
  addr: AddrParts,
  cartItems: ICartItem[],
  opts: Options = {}
): ShippingFeeState {
  const {
    service_id = null,
    insurance_value = null,
    coupon = null,
    debounceMs = 350,
  } = opts;

  const [fee, setFee] = useState<number | null>(null);
  const [eta, setEta] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const ghnItems: GhnItem[] = useMemo(() => {
    return cartItems.map((i) => ({
      name: i.productName ?? "item",
      quantity: i.quantity,
      length: 10, // cm
      width: 10, // cm
      height: 5, // cm
      weight: 200, // gram
    }));
  }, [cartItems]);

  const totalWeight = useMemo(
    () => ghnItems.reduce((sum, it) => sum + it.weight * it.quantity, 0),
    [ghnItems]
  );

  const ready = Boolean(addr?.district?.DistrictID && addr?.ward?.WardCode);

  // Payload gửi FE → BE
  const buildPayload = (): FeeReqBase | null => {
    if (!ready) return null;
    return {
      to_district_id: addr!.district!.DistrictID,
      to_ward_code: addr!.ward!.WardCode,
      service_id,
      weight: 1500,
      insurance_value,
      coupon,
      items: ghnItems,
      service_type_id: 2,
    };
  };

  const timerRef = useRef<number | null>(null);

  const clearTimer = () => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const fetchFee = async () => {
    const payload = buildPayload();
    if (!payload) return;

    setLoading(true);
    setError(null);

    try {
      const res = await cartApi.calculateShippingFee(payload);
      const data = res.data.data

      setFee(data.total);
    } catch (e: any) {
      setError(e?.response?.data?.message ?? "Không tính được phí vận chuyển");
      setFee(null);
      setEta(null);
    } finally {
      setLoading(false);
    }
  };

  // Debounce khi địa chỉ thay đổi
  useEffect(() => {
    // Mỗi khi province/district/ward đổi → reset fee để tránh hiển thị sai
    setFee(null);
    setEta(null);
    setError(null);

    clearTimer();
    if (!ready) return;

    timerRef.current = window.setTimeout(() => {
      fetchFee();
    }, debounceMs);

    return clearTimer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    addr?.province?.ProvinceID,
    addr?.district?.DistrictID,
    addr?.ward?.WardCode,
    totalWeight,
    service_id,
    insurance_value,
    coupon,
  ]);

  return {
    fee,
    eta,
    isLoading: isLoading,
    error,
    refetch: fetchFee,
  };
}
