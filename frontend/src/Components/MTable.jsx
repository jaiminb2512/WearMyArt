import { Box, CircularProgress, Paper } from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
} from "@mui/x-data-grid";
import React from "react";

const MTable = ({ rows, columns, isLoading }) => {
  const paginationModel = { page: 0, pageSize: 10 };

  // Custom Toolbar with specific options
  const CustomToolbar = () => (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
    </GridToolbarContainer>
  );

  return (
    <div className="flex flex-col items-center gap-4 my-4">
      <Paper
        sx={{
          height: "80vh",
          width: "95%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "auto",
        }}
      >
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            slots={{ toolbar: CustomToolbar }}
            pageSizeOptions={[5, 10, 25, 50]}
            checkboxSelection
            sx={{
              border: 0,
            }}
            isRowSelectable={() => true}
            onRowClick={(params, event) => {
              if (!event.target.type || event.target.type !== "checkbox") {
                event.defaultMuiPrevented = true;
              }
            }}
          />
        )}
      </Paper>
    </div>
  );
};

export default MTable;
