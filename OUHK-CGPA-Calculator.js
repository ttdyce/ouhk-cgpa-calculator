try {
    const getGPA = (grade) => {
        if (grade === 'A') return 4.0;
        if (grade === 'A-') return 3.7;
        if (grade === 'B+') return 3.3;
        if (grade === 'B') return 3.0;
        if (grade === 'B-') return 2.7;
        if (grade === 'C+') return 2.3;
        if (grade === 'C') return 2.0;
        if (grade === 'Fail') return 0.0;
        return -1;
    }

    let table = [...document.querySelector('frame[name="TargetContent"]').contentDocument.querySelectorAll('table.PSLEVEL2GRID')].find((element) => {
        let text = element.innerText;
        return text.includes('Subj') && text.includes('Catalog') && text.includes('Unit') && text.includes('Grade');
    });
    let header = table.getElementsByTagName('th');
    let results = [...table.getElementsByTagName('tr')].filter(course => course.getElementsByTagName('td').length !== 0)
        .map((rowElement) => {
            let course = {};
            [...rowElement.getElementsByTagName('td')].forEach(function (cellElement, columnIndex) {
                course[header[columnIndex].textContent] = cellElement.textContent.replace(/\n/g, '');
            });
            return course;
        });

    let credit = 0;
    let gpa = 0;
    let included = [];
    let notIncluded = [];
    results.forEach(function (element) {
        if (getGPA(element.Grade) !== -1) {
            included.push(element.Subj + element.Catalog + '     ' + element.Unit + '     ' + element.Grade + '     ' + getGPA(element.Grade));
            credit += Number(element.Unit);
            gpa += element.Unit * getGPA(element.Grade);
        } else {
            notIncluded.push(element.Subj + element.Catalog);
        }
    });
    alert('CGPA: ' + (gpa / credit) + '\n\n' +
        (notIncluded.length > 0 ? 'Course Result not released\n' + notIncluded.join('\n') + '\n\n' : '') +
        'Included in CGPA\n' + included.join('\n') + '\n\n' +
        'OUHK CGPA Calculator by Max Loh');
} catch (e) {
    alert('Please press "view all terms" button in "Academic Record" page and try run this script again')
}