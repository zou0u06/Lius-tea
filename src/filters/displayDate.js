export default (tempDate) => {
  if (tempDate) {
    const d = new Date(tempDate * 1000);
    const yyyy = d.getFullYear();
    let mm;
    let dd;
    if (d.getMonth() + 1 > 9) {
      mm = d.getMonth() + 1;
    } else { mm = `0${d.getMonth() + 1}`; }
    if (d.getDate() > 9) {
      dd = d.getDate();
    } else { dd = `0${d.getDate()}`; }
    return `${yyyy}-${mm}-${dd}`;
  } return '';
};
