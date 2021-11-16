import { Button, Tooltip, Typography } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import React, { useState } from 'react';

export default function CopyPix({ pix }) {
  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  async function copyTextToClipboard(text) {
    if ('clipboard' in navigator) {
      return navigator.clipboard.writeText(text).then(() => {
        handleTooltipOpen();
      });
    } else {
      handleTooltipOpen();
      return document.execCommand('copy', true, text);
    }
  }

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <CopyToClipboard text={pix}>
        <Tooltip
          title="Pix Copiado!"
          onClose={handleTooltipClose}
          PopperProps={{
            disablePortal: true,
          }}
          open={open}
          disableFocusListener
          disableHoverListener
          disableTouchListener
        >
          <Button
            sx={{
              height: 40,
              padding: '1.5em',
              display: 'flex',
              margin: 'auto',
            }}
            color="shinyBlue"
            variant="contained"
            onClick={() => copyTextToClipboard(pix)}
          >
            <ContentCopyIcon color="lightFont" />
            <Typography
              color="#ECECEA"
              sx={{
                fontSize: 22,
                letterSpacing: '0.4em',
                marginLeft: '1em',
                fontWeight: 'bold',
              }}
            >
              {pix}
            </Typography>
          </Button>
        </Tooltip>
      </CopyToClipboard>
    </ClickAwayListener>
  );
}
