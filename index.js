// const formattedTriplets = (a,b) => {
//     let finalvalue;
//     let ana = 0;
//     let bob = 0;
//     for(i = 0; i < a.length; i++) {
//         if(a[i] > b[i]) {
//             ana += 1
//         } 
//         if(a[i] < b[i]) {
//             bob +=1
//         }
//     }
//     console.log([ana], [bob])
//     const concatasd= [ana].concat([bob])
//     console.log(concatasd)
// }

// formattedTriplets([5,6,7], [3,6,10])

const diagonalDiferrence = (arr) => {
       let primarySum = 0;
       let secondarySum = 0;
       const n = arr.length;

       for (let i = 0; i < n; i++) {
        primarySum += arr[i][i];
        secondarySum += arr[i][n - 1 - i];
       }

       return Math.abs(primarySum - secondarySum)
}

diagonalDiferrence([
    [11,2,4],
    [4,5,6],
    [10,8,-12]
])