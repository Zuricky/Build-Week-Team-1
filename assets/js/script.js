function risposta(n) {
  if (n === 4) {
      return true;
  } else {
      return false;
  }
}
console.log(risposta(60));

function risposta1(n) {
  if (n === 7) {
      return true;
  } else {
      return false;
  }
}
console.log(risposta1(7));

function risposta2(n) {
  if (n === 20) {
      return true;
  } else {
      return false;
  }
}
console.log(risposta2(20));


  const sommaTrue = [risposta(60), risposta1(7), risposta2(20)].filter(risposta => risposta === true).length;
  console.log( sommaTrue, "/3");

  const risposteTot = [risposta(60), risposta1(7), risposta2(20)];
  const numeroTrue = risposteTot.filter(risposta => risposta === true).length;

  const percentualeTrue = (numeroTrue / risposteTot.length) * 100;


document.getElementById("giustePercentuale").innerText= percentualeTrue.toFixed(2) + "%";
document.getElementById("giusteNumero").innerText= numeroTrue + "/3"

  const sommaFalse = [risposta(60), risposta1(7), risposta2(20)].filter(risposta => risposta === false).length;
  console.log( sommaFalse, "/3");

  const numeroFalse = risposteTot.filter(risposta => risposta === false).length;

  const percentualeFalse = (numeroFalse / risposteTot.length) * 100;

document.getElementById("wrongPercentuale").innerText= percentualeFalse.toFixed(2) + "%";
document.getElementById("wrongNumero").innerText= numeroFalse + "/3"


let messaggio;
if (numeroTrue > risposteTot.length / 2) {
    messaggio = "Cogratulations! You passed the exam. We'll send you the certification in few minutes. Check your email"; 
} else {
    messaggio = "You didn't passed the exam. We'll send you instructions on how retake the test.";
}

document.getElementById("messaggio").innerText = messaggio;