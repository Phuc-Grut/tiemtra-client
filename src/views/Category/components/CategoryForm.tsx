import***REMOVED***{***REMOVED***Box,***REMOVED***TextField,***REMOVED***Button,***REMOVED***Typography***REMOVED***}***REMOVED***from***REMOVED***"@mui/material";

const***REMOVED***CategoryForm***REMOVED***=***REMOVED***()***REMOVED***=>***REMOVED***{
***REMOVED******REMOVED***return***REMOVED***(
***REMOVED******REMOVED******REMOVED******REMOVED***<Box***REMOVED***sx={{***REMOVED***display:***REMOVED***"flex",***REMOVED***flexDirection:***REMOVED***"column",***REMOVED***gap:***REMOVED***2,***REMOVED***maxWidth:***REMOVED***400***REMOVED***}}>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Typography***REMOVED***variant="h6">Thêm***REMOVED***Danh***REMOVED***Mục</Typography>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<TextField***REMOVED***label="Tên***REMOVED***danh***REMOVED***mục"***REMOVED***variant="outlined"***REMOVED***fullWidth***REMOVED***/>
***REMOVED******REMOVED******REMOVED******REMOVED******REMOVED******REMOVED***<Button***REMOVED***variant="contained"***REMOVED***color="primary">Lưu</Button>
***REMOVED******REMOVED******REMOVED******REMOVED***</Box>
***REMOVED******REMOVED***)
}

export***REMOVED***default***REMOVED***CategoryForm
