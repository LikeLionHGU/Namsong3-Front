import { Button, Menu, MenuItem } from "@mui/material";
import React from "react";
import Fade from "@mui/material/Fade";

function GoalEditDropdown() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl((prevAnchorEl) => (prevAnchorEl ? null : event.currentTarget));
  };

  const handleClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          position: "absolute",
          top: "8px",
          right: "8px",
          padding: "4px 8px",
          borderRadius: "4px",
        }}
      >
        드롭다운
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        PaperProps={{
          sx: { borderRadius: "10px" },
        }}
      >
        <MenuItem sx={menuItemStyle} onClick={(event) => handleClose(event)}>
          수정하기
        </MenuItem>
        <MenuItem sx={menuItemStyle} onClick={(event) => handleClose(event)}>
          삭제하기
        </MenuItem>
      </Menu>
    </div>
  );
}

export default GoalEditDropdown;

const menuItemStyle = {
  fontSize: "12px",
  width: "66px",
  height: "27px",
  padding: "0 12px",
  "&:hover": {
    backgroundColor: "#E7F0FF",
  },
};
