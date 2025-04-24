export interface Brand {
    id: number;
    name: string;
  }
  
  export interface Category {
    id: number;
    name: string;
  }
  
  export interface Attribute {
    id: number;
    name: string;
    value: string;
  }
  
  export const brands: Brand[] = [
    { id: 1, name: "Brand A" },
    { id: 2, name: "Brand B" },
    { id: 3, name: "Brand C" },
  ];
  
  export const categories: Category[] = [
    { id: 1, name: "Đồ uống" },
    { id: 2, name: "Thực phẩm" },
    { id: 3, name: "Đồ gia dụng" },
  ];
  
  export const attributes: Attribute[] = [
    { id: 1, name: "Trọng lượng", value: "500g" },
    { id: 2, name: "Kích thước", value: "20x30cm" },
    { id: 3, name: "Màu sắc", value: "Xanh" },
    { id: 4, name: "Chất liệu", value: "Nhựa" },
    { id: 5, name: "Hạn sử dụng", value: "12 tháng" },
  ];