import React from "react";
import { styled } from '@mui/material/styles';
import { Stack, Grid, Box, } from '@mui/material';
import Button, { ButtonProps } from '@mui/material/Button';
import Typography, { TypographyProps } from '@mui/material/Typography';
import { useMessageContext } from "../../contexts/MessageContext";
import TableItem, { TableItemColors } from "../TableItem/TableItem";


const GreenButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText('#88FCA3'),
  backgroundColor: '#88FCA3',
  '&:hover': {
    backgroundColor: "#66d981",
  },
  padding: '4px 24px',
  fontWeight: "bold",
  boxShadow: theme.shadows[2]
}));

const ColumnHeaders = styled(Typography)<TypographyProps>(() => ({
  fontWeight: 'bold'
}))


const Table: React.FC = () => {

  const context = useMessageContext()

  return (
    <Box>

      <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 8 }}>
        <GreenButton onClick={context?.toggleMessageLoad}>
          {context?.loadMessages ? "Stop" : "Start"}
        </GreenButton>
        <GreenButton onClick={context?.clearAllMessage}>Clear</GreenButton>
      </Stack>

      <Grid container spacing={2} >
        <Grid item xs={4}>
          <ColumnHeaders variant="h5">Error Type 1</ColumnHeaders>
          <Typography>Count {context?.errorMessages.length}</Typography>
          {context?.errorMessages.slice(0).reverse().map?.((msg) => (
            <TableItem key={msg.message} message={msg} color={TableItemColors.error} />
          ))}
        </Grid>
        <Grid item xs={4}>
          <ColumnHeaders variant="h5">Warning Type 2</ColumnHeaders>
          <Typography>Count {context?.warningMessages.length}</Typography>
          {context?.warningMessages.slice(0).reverse().map?.((msg, index) => (
            <TableItem key={msg.message} message={msg} color={TableItemColors.warning} />
          ))}
        </Grid>
        <Grid item xs={4}>
          <ColumnHeaders variant="h5">Info Type 3</ColumnHeaders>
          <Typography>Count {context?.infoMessages.length}</Typography>
          {context?.infoMessages.slice(0).reverse().map?.((msg, index) => (
            <TableItem key={msg.message} message={msg} color={TableItemColors.info} />
          ))}
        </Grid>
      </Grid>

    </Box >
  );
};

export default Table;
