/* 
This project aims to produce simulated DNA strands 
for the P. aeqor (fictional) organism
*/
let globalPAeqorId = 1;
const dnaBases = ['A', 'T', 'C', 'G'];
// Returns a random DNA base
const returnRandBase = () => {
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (fullDnaStrand) => {
  const dna = typeof fullDnaStrand === 'function' ? fullDnaStrand() : fullDnaStrand;
  if (dna.length !== 15){
    return 'Input Error: DNA strand does not have exactly 15 DNA bases.';
  }
  globalPAeqorId ++;
  return{
    _specimenNum: globalPAeqorId-1,
    get specimenNum () {
      return this._specimenNum;
    },
    set specimenNum(newNum) {
      console.log('Unique Specimen Id NUmber cannot be changed.');
      return this._specimenNum;
    },
    _dna: dna,
    get dna (){
      return this._dna;
    },
    set dna (newDna){
      this.dna = newDna;
    },
    mutate() { // changes one base in the DNA strand and updates the .dna property
      const mutatedDna = this.dna;
      const randIndex = Math.floor(Math.random()*this.dna.length);
      const randDnaObjElement = this.dna[randIndex];
      let randDnaBase = returnRandBase();
      while (randDnaBase === randDnaObjElement) {
        randDnaBase = returnRandBase();
      }
      mutatedDna[randIndex] = randDnaBase;
      this._dna = mutatedDna
      return this._dna;
    },
    compareDna (pAequorObj) { // compares this.dna with another specimen and prints the pecentage shared DNA
      const numSame = pAequorObj.dna.reduce((accu,currVal,index) => {
        return this.dna[index]===currVal ? accu+1 : accu;
      },0)
      percentSame = numSame * 100/pAequorObj.dna.length;
      percentSameTo2dp = percentSame.toFixed(2);
      console.log(`Specimens number ${this.specimenNum} & ${pAequorObj.specimenNum} have ${percentSameTo2dp}% DNA in common.`);
    },
    willLikelySurvive() { // Specimens with >60% C or G bases are more likely to surive. Returns true if this is the case.
      const numCOrG = this.dna.reduce((accu,currVal) => {
        if (currVal === 'C' || currVal === 'G') {
          return accu + 1;
        } else {
          return accu
        }
      },0)
      return numCOrG/this.dna.length >=0.6;
    },
    complementaryStrand(){ // Returns the complementary DNA strand where A pairs with T and C with G
      const dnaArray = this.dna
      const outputArray = dnaArray.map(base => {
        switch (base){
          case 'T':
            return 'A';
          case 'A':
            return 'T';
          case 'G':
            return 'C';
          case 'C':
            return 'G';
        }
      })
      return outputArray;
    },
    printSpecDetails() {
      console.log(`Specimen ${this.specimenNum} DNA strand\n`,this.dna);
    }
  }
}

// Uses the factory sunction to create a generic specimen.
function createSpecimen(){ 
  return pAequorFactory(mockUpStrand);
}

// Uses the factory function and .willLikelySurvive() to 
// create a specimen with >60% C or G base
function createLikelyToSurviveSpec(){
  let spec = pAequorFactory(mockUpStrand)
  while (spec.willLikelySurvive()===false){
    spec = pAequorFactory(mockUpStrand);
  }
  return spec;
}

/*
Creates an array of specimen objects of length arrLen, using a callback function
that creates a specimen (ie createSpecimen(), createLikelyToSurviveSpec() etc) 
*/
function creatArrOfSpecimens(arrLen,specCreatefunc) {
  const specArr = [];
  for (let i=0;i<arrLen;i++){
    specArr.push(specCreatefunc());
  }
  return specArr;
}

//// TEST AREA ////
let firstSpec = pAequorFactory(mockUpStrand);
//let firstSpec = pAequorFactory(['A','C','G','G','A','T','G','T','G','C','T','A','G','C','G'])
//console.log(`Specimen ${firstSpec.specimenNum} DNA strand\n`,firstSpec.dna);
//secondSpec = pAequorFactory(mockUpStrand);
//console.log(`Specimen ${secondSpec.specimenNum} DNA strand\n`,secondSpec.dna);
//firstSpec.printSpecDetails();
//console.log(`Is Specimen ${firstSpec.specimenNum} likely to survive? `,firstSpec.willLikelySurvive() ? 'Yes' : 'No');
//firstSpec.mutate();
//console.log('Same specimen with mutated DNA\n', firstSpec.mutate());

/* while (firstSpec.willLikelySurvive()===false){
  firstSpec = pAequorFactory(mockUpStrand);
  //console.log(firstSpec.willLikelySurvive());
}
console.log(`Specimen ${firstSpec.specimenNum} will likely survive with DNA strand:\n`,firstSpec.dna);
 */
/* 
const arr30SurviveSpecs = creatArrOfSpecimens(30,createLikelyToSurviveSpec);
console.log(arr30SurviveSpecs.map(i => i.dna));
arr30SurviveSpecs.forEach(i => console.log(i.willLikelySurvive()));
 */
/* 
let spec = createSpecimen();
spec.printSpecDetails();
console.log(`Specimen ${spec.specimenNum} complementary DNA strand:\n`,spec.complementaryStrand())
 */