import React from "react";
import { Message } from "../../Api";
import { Box, Grid } from "@mui/material";
import { useMessageContext } from "../../contexts/MessageContext";

export enum TableItemColors {
  error = "#F56236",
  warning = "#FCE788",
  info = "#88FCA3",
}

interface TableItemProps {
  message: Message;
  color: TableItemColors;
}

const TableItem: React.FC<TableItemProps> = ({ message, color }) => {

  const context = useMessageContext()

  return (
    <Box
      sx={{
        padding: 2,
        my: '12px',
        borderRadius: "5px",
        boxShadow: 1,
        backgroundColor: color,
      }}
    >
      <Grid container sx={{ minHeight: '48px' }} >
        <Grid xs={10} item>
          {message.message}
        </Grid>
        <Grid xs={2} item>
          <Box sx={{
            height: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', pr: 1
          }}>
            <Box onClick={() => context?.removeSingleMessage(message)} sx={{
              ":hover": {
                cursor: 'pointer'
              }
            }}>
              Clear
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TableItem;
