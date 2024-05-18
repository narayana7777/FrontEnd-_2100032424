document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('dynamic-form');
    const addTextButton = document.getElementById('add-text');
    const addCheckboxButton = document.getElementById('add-checkbox');
    const addRadioButton = document.getElementById('add-radio');
    const removeLastButton = document.getElementById('remove-last');

    let fieldCount = 0;

    addTextButton.addEventListener('click', () => addField('text'));
    addCheckboxButton.addEventListener('click', () => addField('checkbox'));
    addRadioButton.addEventListener('click', () => addField('radio'));
    removeLastButton.addEventListener('click', removeLastField);

    function addField(type) {
        fieldCount++;
        const fieldWrapper = document.createElement('div');
        fieldWrapper.className = 'form-field';
        fieldWrapper.id = `field-${fieldCount}`;

        let newField;
        switch (type) {
            case 'text':
                newField = document.createElement('input');
                newField.type = 'text';
                newField.name = `text-${fieldCount}`;
                newField.placeholder = `Text Input ${fieldCount}`;
                break;
            case 'checkbox':
                newField = document.createElement('input');
                newField.type = 'checkbox';
                newField.name = `checkbox-${fieldCount}`;
                fieldWrapper.appendChild(document.createTextNode(` Checkbox ${fieldCount} `));
                break;
            case 'radio':
                newField = document.createElement('input');
                newField.type = 'radio';
                newField.name = 'radio-group';
                newField.value = `radio-${fieldCount}`;
                fieldWrapper.appendChild(document.createTextNode(` Radio Button ${fieldCount} `));
                break;
        }

        fieldWrapper.appendChild(newField);
        form.appendChild(fieldWrapper);
    }

    function removeLastField() {
        if (form.lastChild) {
            form.removeChild(form.lastChild);
        }
    }
});
