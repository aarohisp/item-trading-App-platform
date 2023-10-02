import React from "react";
// import ChartCard from "./ChartCard";

// const Dashboard: React.FC = () => {
//   const numCols = 4; // Number of columns

//   // Create an array to represent the grid
//   const grid = [];

//   // Generate the cards and add them to the grid
//   for (let col = 0; col < numCols; col++) {
//     const colCards = [];
//     for (let row = 0; row < numCols; row++) {
//       const cardIndex = col * numCols + row;
//       colCards.push(
//         <div key={cardIndex} className={`col-xl-3 col-md-6`}>
//           <ChartCard
//             title={`Card ${cardIndex + 1}`}
//             amount={`$${Math.floor(Math.random() * 1000)}`} // Random amount
//             trend={`${Math.floor(Math.random() * 100)}% up`} // Random trend
//             iconClass="icon-menu-up"
//             chartId={`chart-${cardIndex}`}
//           />
//         </div>
//       );
//     }
//     grid.push(
//       <div key={col} className="row">
//         {colCards}
//       </div>
//     );
//   }

//   return (
//     <div className="dt-container">
//       <div className="dt-content-wrapper">
//         <div className="dt-content">{grid}</div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
