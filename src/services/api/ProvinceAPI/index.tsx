export interface Province {
  ProvinceID: number;
  ProvinceName: string;
}
export interface District {
  DistrictID: number;
  DistrictName: string;
  ProvinceID: number;
  Code: string;
}
export interface Ward {
  WardCode: string;      // mã phường GHN (string, ví dụ "21211")
  WardName: string;      // tên phường, ví dụ "Phường Bến Nghé"
  DistrictID: number;    // id quận/huyện GHN (ví dụ 1442 cho Quận 1)
}

export async function fetchProvinces(): Promise<Province[]> {
  const res = await fetch(
    "https://online-gateway.ghn.vn/shiip/public-api/master-data/province",
    {
      headers: {
        Token: "7c638309-92cd-11f0-bb8c-8a4f6aa02e6f"
      }
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch provinces");
  }

  const json = await res.json();
  return json.data;
}

export async function fetchDistricts(provinceId: number): Promise<District[]> {
  const res = await fetch(
    "https://online-gateway.ghn.vn/shiip/public-api/master-data/district",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Token: "7c638309-92cd-11f0-bb8c-8a4f6aa02e6f" 
      },
      body: JSON.stringify({ province_id: provinceId })
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch districts");
  }

  const json = await res.json();
  return json.data as District[];
}


export async function fetchWards(districtId: number): Promise<Ward[]> {
  const res = await fetch(
    "https://online-gateway.ghn.vn/shiip/public-api/master-data/ward",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Token: "7c638309-92cd-11f0-bb8c-8a4f6aa02e6f" 
      },
      body: JSON.stringify({ district_id: districtId })
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch wards");
  }

  const json = await res.json();
  return json.data as Ward[]; // GHN trả về { code, message, data }
}
