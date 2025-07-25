import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (html: string) => void;
  initialData: string;
  readOnly?: boolean;
}

const CKEditorDialog = ({
  open,
  onClose,
  onSave,
  initialData,
  readOnly,
}: Props) => {
  const [editorData, setEditorData] = React.useState(initialData);

  React.useEffect(() => {
    setEditorData(initialData);
  }, [initialData]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          minHeight: "70vh",
          maxHeight: "90vh",
        },
      }}
    >
      <DialogTitle> Mô tả sản phẩm</DialogTitle>
      <DialogContent
        dividers
        sx={{
          "& .MuiDialog-paper": {
            minHeight: "70vh",
            maxHeight: "90vh",
          },
        }}
      >
        <CKEditor
          editor={ClassicEditor}
          data={editorData}
          disabled={readOnly}
          config={{
            licenseKey:
              "eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NTMwNTU5OTksImp0aSI6IjIyMDM0NWNiLWMwNWYtNGViMy05NTZkLWVkMThiNWRhNTlhZCIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6IjZmMDhmOWJjIn0.mLld4MYPf-n6SNxrmtT7gXPj8feQIX72N5bBZAOmFi-GjfmnubpeGW4z0-s-jJ_ifXJa4eg3FskR3x07mIHlWQ",
            toolbar: [
              "heading",
              "|",
              "bold",
              "italic",
              "link",
              "blockQuote",
              "insertTable",
              "bulletedList",
              "numberedList",
              "|",
              "undo",
              "redo",
            ],
          }}
          onChange={(event, editor) => {
            setEditorData(editor.getData());
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Huỷ</Button>
        <Button
          disabled={readOnly}
          onClick={() => onSave(editorData)}
          variant="contained"
        >
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CKEditorDialog;
