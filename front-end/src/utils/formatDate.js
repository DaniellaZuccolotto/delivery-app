function formatDate(data1) {
  const NUMBER_TEN = 10;
  const NUMBER_SEVEN = 7;
  const NUMBER_EIGHT = 8;
  const NUMBER_FOUR = 4;
  const NUMBER_FIVE = 5;
  const data = data1.slice(0, NUMBER_TEN);
  const dia = data.slice(NUMBER_EIGHT, NUMBER_TEN);
  const mes = data.slice(NUMBER_FIVE, NUMBER_SEVEN);
  const ano = data.slice(0, NUMBER_FOUR);
  return `${dia}/${mes}/${ano}`;
}

export default formatDate;
