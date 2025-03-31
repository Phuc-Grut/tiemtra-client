import***REMOVED***React,***REMOVED***{***REMOVED***useState***REMOVED***}***REMOVED***from***REMOVED***"react";
import***REMOVED***{
***REMOVED******REMOVED***Dialog,
***REMOVED******REMOVED***DialogTitle,
***REMOVED******REMOVED***DialogContent,
***REMOVED******REMOVED***DialogActions,
***REMOVED******REMOVED***TextField,
***REMOVED******REMOVED***Button,
}***REMOVED***from***REMOVED***"@mui/material";
import***REMOVED***LockIcon***REMOVED***from***REMOVED***"@mui/icons-material/Lock";

interface***REMOVED***Props***REMOVED***{
***REMOVED******REMOVED***open:***REMOVED***boolean;
***REMOVED******REMOVED***onClose:***REMOVED***()***REMOVED***=>***REMOVED***void;
***REMOVED******REMOVED***parentCategoryName?:***REMOVED***string;
***REMOVED******REMOVED***parentCategoryId?:***REMOVED***number;
}

const***REMOVED***AddCategoryModal***REMOVED***=***REMOVED***({***REMOVED***open,***REMOVED***onClose,***REMOVED***parentCategoryName,***REMOVED***parentCategoryId***REMOVED***}:***REMOVED***Props)***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED***console.log("🚀***REMOVED***~***REMOVED***AddCategoryModal***REMOVED***~***REMOVED***parentCategoryId:",***REMOVED***parentCategoryId)
***REMOVED******REMOVED***const***REMOVED***[name,***REMOVED***setName]***REMOVED***=***REMOVED***useState("");
***REMOVED******REMOVED***const***REMOVED***[description,***REMOVED***setDescription]***REMOVED***=***REMOVED***useState("");
***REMOVED******REMOVED***const***REMOVED***[error,***REMOVED***setError]***REMOVED***=***REMOVED***useState(false);

***REMOVED******REMOVED***const***REMOVED***handleSubmit***REMOVED***=***REMOVED***()***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(!name.trim())***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***setError(true);
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***return;
***REMOVED******REMOVED******REMOVED******REMOVED***}

***REMOVED******REMOVED******REMOVED******REMOVED***setError(false);

***REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***TODO:***REMOVED***gọi***REMOVED***API***REMOVED***thêm***REMOVED***danh***REMOVED***mục***REMOVED***ở***REMOVED***đây
***REMOVED******REMOVED******REMOVED******REMOVED***console.log("Tên:",***REMOVED***name,***REMOVED***"Mô***REMOVED***tả:",***REMOVED***description);

***REMOVED******REMOVED******REMOVED******REMOVED***//***REMOVED***Đóng***REMOVED***modal
***REMOVED******REMOVED******REMOVED******REMOVED***onClose();
***REMOVED******REMOVED***};

***REMOVED******REMOVED***return***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED***<Dialog***REMOVED***open={open}***REMOVED***onClose={onClose}>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<DialogTitle>Thêm***REMOVED***danh***REMOVED***mục</DialogTitle>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<DialogContent>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***{parentCategoryName***REMOVED***&&***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<TextField
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***fullWidth
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***label="Danh***REMOVED***mục***REMOVED***cha"
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***value={parentCategoryName}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***margin="dense"
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***InputProps={{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***readOnly:***REMOVED***true,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***sx:***REMOVED***{***REMOVED***opacity:***REMOVED***0.6,***REMOVED***cursor:***REMOVED***"default",***REMOVED***fontWeight:***REMOVED***"bold"***REMOVED***},
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***endAdornment:***REMOVED***<LockIcon***REMOVED***fontSize="medium"***REMOVED***color="secondary"***REMOVED***/>,
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***)}

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<TextField
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***fullWidth
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***label="Tên***REMOVED***danh***REMOVED***mục"
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***margin="dense"
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***value={name}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***onChange={(e)***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***setName(e.target.value);
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***if***REMOVED***(error***REMOVED***&&***REMOVED***e.target.value.trim())***REMOVED***{
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***setError(false)
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***}}***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***error={error}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***helperText={error***REMOVED***?***REMOVED***"Vui***REMOVED***lòng***REMOVED***nhập***REMOVED***tên***REMOVED***danh***REMOVED***mục"***REMOVED***:***REMOVED***""}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***/>

***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<TextField
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***fullWidth
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***label="Mô***REMOVED***tả"
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***multiline
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***minRows={5}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***value={description}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***onChange={(e)***REMOVED***=>***REMOVED***setDescription(e.target.value)}
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</DialogContent>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<DialogActions>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Button***REMOVED***variant="contained"***REMOVED***color="primary"***REMOVED***onClick={handleSubmit}>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***Thêm
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</Button>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Button***REMOVED***variant="outlined"***REMOVED***onClick={onClose}>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***Hủy
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</Button>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***</DialogActions>
***REMOVED******REMOVED******REMOVED******REMOVED***</Dialog>
***REMOVED******REMOVED***);
};

export***REMOVED***default***REMOVED***AddCategoryModal;
