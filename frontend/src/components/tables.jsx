import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Box, Typography } from '@mui/material';
// import axios from 'axios';

const DisasterReportsTable = () => {
  const [disasterReports, setDisasterReports] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true); // Loading state for fetching data

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
    // Simulating an API call with dummy data
    setTimeout(() => {
      setDisasterReports(dummyData); // Simulate data fetching
      setLoading(false); // Set loading to false once data is fetched
    }, 1000); // Simulate 1 second delay

    // Commented out the backend fetching code
    // axios.get('path_to_your_backend_api/reports/')
    //   .then((response) => {
    //     setDisasterReports(response.data);
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching data", error);
    //     setLoading(false);
    //   });
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

  if (loading) {
    return (
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h6" sx={{ color: '#5f6368' }}>Loading disaster reports...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4, width: '90%', maxWidth: '1200px', margin: '0 auto' }}>
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Subtle shadow for modern look
          borderRadius: '8px', // Rounded corners for modern design
          padding: '16px',
          backgroundColor: '#FFFFFF',
          overflow: 'hidden',
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {['Disaster Type', 'Description', 'Severity Level', 'Reported At', 'Resource Required'].map((header) => (
                <TableCell
                  key={header}
                  sx={{
                    fontWeight: 'bold',
                    color: '#34495E',
                    fontSize: '16px',
                    textAlign: 'center',
                    padding: '12px',
                    backgroundColor: '#F4F6F9',
                    letterSpacing: '0.5px',
                    borderBottom: '2px solid #E1E8EB',
                  }}
                >
                  <Typography variant="h6">{header}</Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {disasterReports
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((report) => (
                <TableRow
                  key={report.id}
                  sx={{
                    '&:hover': {
                      backgroundColor: '#F0F4F8', // Light hover effect for interactivity
                    },
                    cursor: 'pointer',
                  }}
                >
                  <TableCell
                    sx={{
                      fontFamily: '"Arial", sans-serif',
                      color: '#34495E',
                      textAlign: 'center',
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
        sx={{ marginTop: '1rem', color: '#5f6368' }}
      />
    </Box>
  );
};

export default DisasterReportsTable;
