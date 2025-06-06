import React from "react";
// import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import CustomEditor from "src/ckeditor/CustomEditor";

interface Props {
  open: boolean;
  initialValue?: string;
  onClose: () => void;
  onSave: (value: string) => void;
}

const DialogEditor: React.FC<Props> = ({
  open,
  initialValue,
  onClose,
  onSave,
}) => {
  const [content, setContent] = React.useState(initialValue);

  React.useEffect(() => {
    setContent(initialValue);
  }, [initialValue]);

  return (
    //     <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
    //       <DialogTitle>Nhập mô tả sản phẩm</DialogTitle>
    //       <DialogContent dividers>
    //         <CKEditor
    //           editor={CustomEditor}
    //           data={content}
    //           onReady={(editor) => {
    //             console.log("CKEditor đã sẵn sàng:", editor); // Debug để kiểm tra editor
    //           }}
    //           onChange={(event, editor) => {
    //             if (editor) {
    //               const data = editor.getData();
    //               setContent(data);
    //             } else {
    //               console.error("Editor không tồn tại.");
    //             }
    //           }}
    //           onError={(error, { willEditorRestart }) => {
    //             console.error("Lỗi CKEditor:", error); // Debug lỗi
    //             if (willEditorRestart) {
    //               console.warn("CKEditor sẽ khởi động lại.");
    //             }
    //           }}
    //         />
    //       </DialogContent>
    //       <DialogActions>
    //         <Button onClick={onClose}>Hủy</Button>
    //         <Button
    //           variant="contained"
    //           onClick={() => {
    //             onSave(content ?? "");
    //             onClose();
    //           }}
    //         >
    //           Lưu
    //         </Button>
    //       </DialogActions>
    //     </Dialog>

    <div>Heelo grunt</div>
  );
};

export default DialogEditor;
