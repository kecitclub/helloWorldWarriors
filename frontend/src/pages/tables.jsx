import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Box, Typography } from '@mui/material';
import axios from 'axios';

const DisasterReportsTable = () => {
  const [disasterReports, setDisasterReports] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Dummy data
  const dummyData = [
    {
      id: 1,
      disaster: { disaster_type: "Flood" },
      description: "Severe flooding in the city center.",
      severity_level: "Critical",
      reported_at: "2025-01-09T12:34:56",
      resource_required: true,
    },
    {
      id: 2,
      disaster: { disaster_type: "Earthquake" },
      description: "Magnitude 6.5 earthquake reported near the coast.",
      severity_level: "High",
      reported_at: "2025-01-08T08:30:21",
      resource_required: false,
    },
    {
      id: 3,
      disaster: { disaster_type: "Fire" },
      description: "Wildfires spreading rapidly across the region.",
      severity_level: "Moderate",
      reported_at: "2025-01-07T16:25:10",
      resource_required: true,
    },
  ];

  useEffect(() => {
    // You can replace this with an actual API call when available.
    setDisasterReports(dummyData);
  }, []);

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when rows per page changes
  };

  return (
    <Box sx={{ mt: 4 }}>
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.1)', // Soft shadow with glow
          borderRadius: '12px', // Rounded corners
          overflow: 'hidden',
          padding: '16px',
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: 'bold',
                  fontFamily: '"Roboto", sans-serif',
                  color: '#2C3E50',
                  letterSpacing: '0.5px',
                  textAlign: 'center', // Center-align the headers
                  padding: '16px',
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Disaster Type
                </Typography>
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 'bold',
                  fontFamily: '"Roboto", sans-serif',
                  color: '#2C3E50',
                  letterSpacing: '0.5px',
                  textAlign: 'center',
                  padding: '16px',
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Description
                </Typography>
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 'bold',
                  fontFamily: '"Roboto", sans-serif',
                  color: '#2C3E50',
                  letterSpacing: '0.5px',
                  textAlign: 'center',
                  padding: '16px',
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Severity Level
                </Typography>
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 'bold',
                  fontFamily: '"Roboto", sans-serif',
                  color: '#2C3E50',
                  letterSpacing: '0.5px',
                  textAlign: 'center',
                  padding: '16px',
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Reported At
                </Typography>
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 'bold',
                  fontFamily: '"Roboto", sans-serif',
                  color: '#2C3E50',
                  letterSpacing: '0.5px',
                  textAlign: 'center',
                  padding: '16px',
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Resource Required
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {disasterReports
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((report) => (
                <TableRow key={report.id}>
                  <TableCell
                    sx={{
                      fontFamily: '"Arial", sans-serif',
                      color: '#34495E',
                      textAlign: 'center', // Center-align the text
                      padding: '12px',
                    }}
                  >
                    {report.disaster.disaster_type}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: '"Arial", sans-serif',
                      color: '#34495E',
                      textAlign: 'center',
                      padding: '12px',
                    }}
                  >
                    {report.description}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: '"Arial", sans-serif',
                      color: '#34495E',
                      textAlign: 'center',
                      padding: '12px',
                    }}
                  >
                    {report.severity_level}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: '"Arial", sans-serif',
                      color: '#34495E',
                      textAlign: 'center',
                      padding: '12px',
                    }}
                  >
                    {new Date(report.reported_at).toLocaleString()}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: '"Arial", sans-serif',
                      color: '#34495E',
                      textAlign: 'center',
                      padding: '12px',
                    }}
                  >
                    {report.resource_required ? "Yes" : "No"}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={disasterReports.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ marginTop: '1rem' }}
      />
    </Box>
  );
};

export default DisasterReportsTable;
