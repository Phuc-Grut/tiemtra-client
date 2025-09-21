export interface FeeReqBase {
  to_district_id: number;
  to_ward_code: string;

  service_id?: number | null;
  service_type_id?: number | null;
  weight: number; // gram
  insurance_value?: number | null;
  coupon?: string | null;
  items?: GhnItem[] | null;
}

export interface GhnItem {
  name: string;
  quantity: number;
  length: number; // cm
  width: number; // cm
  height: number; // cm
  weight: number; // gram
}

export interface FeeResponse {
  total: number; // Tổng phí cuối
  service_fee: number; // Phí dịch vụ
  insurance_fee: number; // Phí bảo hiểm
  r2s_fee?: number | null;
  coupon_value?: number | null;
  pick_station_fee?: number | null;
}
