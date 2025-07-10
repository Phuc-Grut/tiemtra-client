import { Box, TextField, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

type NoteCellProps = {
  value?: string;
};

const NoteCell = ({ value }: NoteCellProps) => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        textarea: {
          resize: "none",
          padding: "4px",
        },
      }}
    >
      <TextField
        value={value}
        multiline
        fullWidth
        variant="outlined"
        minRows={0.5}
        maxRows={0.5}
        InputProps={{
          sx: {
            borderRadius: 1,
            fontSize: 14,
            paddingRight: "32px",
            "& textarea": {
              fontFamily: "inherit",
            },
          },
        }}
      />
      <IconButton
        size="small"
        sx={{
          position: "absolute",
          top: 4,
          right: 4,
          padding: "2px",
          color: "#999",
        }}
      >
        <EditIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default NoteCell;
