import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
const Hub = ({ data }: { data: any }) => {
  return (
    // <Box sx={{ p: 2 }}>
    //   {data.map((locationItem: any, locIndex: number) => (
    //     <Box key={locIndex} sx={{ mb: 4 }}>
    //       <Typography variant="h4" gutterBottom>
    //         📍 {locationItem.location}
    //       </Typography>

    //       {locationItem.hub.map((areaItem: any, areaIndex: number) => (
    //         <Box key={areaIndex} sx={{ mb: 3 }}>
    //           <Typography variant="h5" sx={{ color: "gray", mb: 2 }}>
    //             🏙️ {areaItem.area}
    //           </Typography>

    //           <Grid container spacing={2}>
    //             {areaItem.hubs.map((hub: any, hubIndex: number) => (
    //               <div key={hubIndex}>
    //                 <Card variant="outlined">
    //                   <CardContent>
    //                     <Typography variant="h6" gutterBottom>
    //                       🏢 {hub.hubName}
    //                     </Typography>

    //                     {hub.tables.map((table: any, tableIndex: number) => (
    //                       <Box key={tableIndex} sx={{ mb: 1.5 }}>
    //                         <Typography variant="subtitle1">
    //                           🍽️ {table.tableName}
    //                         </Typography>
    //                         <Box sx={{ pl: 2 }}>
    //                           {Object.entries(table.seats).map(
    //                             ([seatKey, seatStatus]: any, seatIndex) => (
    //                               <Typography
    //                                 key={seatIndex}
    //                                 variant="body2"
    //                                 sx={{
    //                                   color:
    //                                     seatStatus === "available"
    //                                       ? "green"
    //                                       : "red",
    //                                 }}
    //                               >
    //                                 💺 {seatKey} - {seatStatus}
    //                               </Typography>
    //                             )
    //                           )}
    //                         </Box>
    //                       </Box>
    //                     ))}
    //                   </CardContent>
    //                   <CardActions>
    //                     <Button size="small">Book</Button>
    //                   </CardActions>
    //                 </Card>
    //               </div>
    //             ))}
    //           </Grid>
    //         </Box>
    //       ))}
    //     </Box>
    //   ))}
    // </Box>
    <div></div>
  );
};

export default Hub;
