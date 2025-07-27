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
              "eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NTQ4NzAzOTksImp0aSI6Ijk3NmNlOGE5LTA5ZDEtNDhiYS04Mzk3LTYyMzRlNTkxMTM5OSIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6IjQxYTI2Yjk3In0.kJ12ynbsY_ga9NlcrVjiQHqayb7R5WmeQd4KL5XCv6-Dr65b_sHw2lfD1A0wvcFlk7tBYpFd2gChvliOm8q_ew",
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
