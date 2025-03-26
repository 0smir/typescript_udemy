// data:
// initial amount
// annual contribution
// expected return
// duration

type Investment = {
  initialAmount: number;
  annualContribution: number;
  expectedReturn: number;
  duration: number;
};
type InvestmentResult = {
  year: string;
  totalAmount: number;
  totalContributions: number;
  totalInterestEarned: number;
};

type CalculationResult = InvestmentResult[] | string

function calculateInvestment(data: Investment): CalculationResult {// =>result[]
  const { initialAmount, annualContribution, expectedReturn, duration } = data;

  if (initialAmount < 0) {
    return 'Initial investment amount must to de at least zero.';
  }

  if (duration <= 0) {
    return 'No valid amoun of years provided';
  }

  if (expectedReturn < 0) {
    return 'Expected return must be at least zero';
  }

  let total = initialAmount,
    totalContributions = 0,
    totalInterestEarned = 0;

  const annualResults: InvestmentResult[] = [];

  for (let i = 0; i < duration; i++) {
    total = total * (1 + expectedReturn); //0.08
    totalInterestEarned = total - totalContributions - initialAmount;
    totalContributions = totalContributions + annualContribution;
    total = total + annualContribution;

    annualResults.push({
      year: `Year ${i + 1}`,
      totalAmount: total,
      totalInterestEarned,
      totalContributions
    });
  }
  return annualResults;
};

function printResults(results: CalculationResult) {
  //print (output) the result data
  if (typeof results === 'string') {
    console.log(results);
    return;
  }

  for (const yearEndResults of results) {
    console.log(yearEndResults.year);
    console.log(`Total: ${yearEndResults.totalAmount.toFixed(0)}`);
    console.log(`Total Contributions: ${yearEndResults.totalContributions.toFixed(0)}`);
    console.log(`Total Interest Earned: ${yearEndResults.totalInterestEarned.toFixed(0)}`);
    console.log('=====================================================');
  }
};

const investmentData: Investment = {
  initialAmount: 5000,
  annualContribution: 500,
  expectedReturn: 0.08,
  duration: 10
};

const results = calculateInvestment(investmentData);

printResults(results);
