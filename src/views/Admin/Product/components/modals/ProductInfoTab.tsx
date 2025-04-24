import***REMOVED***{***REMOVED***Box,***REMOVED***Button***REMOVED***}***REMOVED***from***REMOVED***"@mui/material";
import***REMOVED***{***REMOVED***useState***REMOVED***}***REMOVED***from***REMOVED***"react";
import***REMOVED***{***REMOVED***attributes,***REMOVED***brands,***REMOVED***categories***REMOVED***}***REMOVED***from***REMOVED***"src/Interfaces/test";
import***REMOVED***DetailedImagesSection***REMOVED***from***REMOVED***"./DetailedImagesSection";
import***REMOVED***ProductFormSection***REMOVED***from***REMOVED***"./ProductFormSection";
import***REMOVED***CategoryAttributesSection***REMOVED***from***REMOVED***"./CategoryAttributesSection";

const***REMOVED***ProductInfoTab***REMOVED***=***REMOVED***()***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED***const***REMOVED***[formData,***REMOVED***setFormData]***REMOVED***=***REMOVED***useState({
***REMOVED******REMOVED******REMOVED******REMOVED***productCode:***REMOVED***"",
***REMOVED******REMOVED******REMOVED******REMOVED***productName:***REMOVED***"",
***REMOVED******REMOVED******REMOVED******REMOVED***previewImage:***REMOVED***null***REMOVED***as***REMOVED***File***REMOVED***|***REMOVED***null,
***REMOVED******REMOVED******REMOVED******REMOVED***price:***REMOVED***"",
***REMOVED******REMOVED******REMOVED******REMOVED***stock:***REMOVED***"",
***REMOVED******REMOVED******REMOVED******REMOVED***origin:***REMOVED***"",
***REMOVED******REMOVED******REMOVED******REMOVED***description:***REMOVED***"",
***REMOVED******REMOVED******REMOVED******REMOVED***brandId:***REMOVED***"",
***REMOVED******REMOVED***});

***REMOVED******REMOVED***const***REMOVED***[detailedImages,***REMOVED***setDetailedImages]***REMOVED***=***REMOVED***useState<File[]>([]);
***REMOVED******REMOVED***const***REMOVED***[selectedCategory,***REMOVED***setSelectedCategory]***REMOVED***=***REMOVED***useState("");

***REMOVED******REMOVED***const***REMOVED***handleSubmit***REMOVED***=***REMOVED***()***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***console.log("Form***REMOVED***Data:",***REMOVED***formData);
***REMOVED******REMOVED******REMOVED******REMOVED***console.log("Detailed***REMOVED***Images:",***REMOVED***detailedImages);
***REMOVED******REMOVED******REMOVED******REMOVED***console.log("Selected***REMOVED***Category:",***REMOVED***selectedCategory);
***REMOVED******REMOVED******REMOVED******REMOVED***console.log("Attributes:",***REMOVED***attributes);
***REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***Thêm***REMOVED***logic***REMOVED***để***REMOVED***lưu***REMOVED***dữ***REMOVED***liệu***REMOVED***sản***REMOVED***phẩm***REMOVED***tại***REMOVED***đây
***REMOVED******REMOVED***};

***REMOVED******REMOVED***return***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED***<Box
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***sx={{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***display:***REMOVED***"flex",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***flexDirection:***REMOVED***"row",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***gap:***REMOVED***3,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***p:***REMOVED***2,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***height:***REMOVED***"100%",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***position:***REMOVED***"relative",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}}
***REMOVED******REMOVED******REMOVED******REMOVED***>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{/****REMOVED***Danh***REMOVED***sách***REMOVED***ảnh***REMOVED***chi***REMOVED***tiết***REMOVED****/}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<DetailedImagesSection
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***detailedImages={detailedImages}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***setDetailedImages={setDetailedImages}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***/>

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{/****REMOVED***Form***REMOVED***thông***REMOVED***tin***REMOVED***sản***REMOVED***phẩm***REMOVED****/}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<ProductFormSection
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***formData={formData}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***setFormData={setFormData}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***brands={brands}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***/>

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{/****REMOVED***Danh***REMOVED***mục***REMOVED***và***REMOVED***thuộc***REMOVED***tính***REMOVED****/}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<CategoryAttributesSection
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***categories={categories}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***selectedCategory={selectedCategory}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***setSelectedCategory={setSelectedCategory}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***attributes={attributes}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***/>

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{/****REMOVED***Nút***REMOVED***Lưu***REMOVED****/}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Box***REMOVED***sx={{***REMOVED***position:***REMOVED***"absolute",***REMOVED***bottom:***REMOVED***-21,***REMOVED***right:***REMOVED***0***REMOVED***}}>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Button
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***onClick={handleSubmit}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***variant="contained"
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***sx={{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***bgcolor:***REMOVED***"#508815",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***color:***REMOVED***"#fff",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***textTransform:***REMOVED***"none",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***fontWeight:***REMOVED***500,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***px:***REMOVED***3,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***py:***REMOVED***1,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***"&:hover":***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***bgcolor:***REMOVED***"#5e9b17",
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***},
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***Lưu
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</Button>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</Box>
***REMOVED******REMOVED******REMOVED******REMOVED***</Box>
***REMOVED******REMOVED***);
};

export***REMOVED***default***REMOVED***ProductInfoTab;