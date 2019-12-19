
const checkbox = ({ checkAllElement, checkElements }) => {
	const checkAll = document.querySelector(checkAllElement);
	const checkItems = document.querySelectorAll(checkElements);
	if(!checkAll || !checkItems) return;

	checkAll.addEventListener('change', () => setCheckAll(checkItems, checkAll));
	checkItems.forEach(checkItem => {
		checkItem.addEventListener('change', () => setCheckEach(checkItems, checkAll));
	});
};

function setCheckEach(checkItems, checkAll) {
	const checks = Array.from(checkItems);
	const isCheckedEvery = checks.every(checkItem => checkItem.checked);
	const isCheckedSome = checks.some(checkItem => checkItem.checked);

	checkAll.checked = isCheckedEvery;
	checkAll.indeterminate = isCheckedSome && !isCheckedEvery;
	checkAll.dataset.indeterminate = isCheckedSome && !isCheckedEvery;
}

function setCheckAll(checkItems, checkAll) {
	checkItems.forEach(checkItem => {
		checkItem.checked = checkAll.checked;
		checkAll.indeterminate = false;
		checkAll.dataset.indeterminate = false;
	});
}

export default checkbox;