function updateLabel(input) {
    const label = input.nextElementSibling;
    const fileName = input.files[0].name;

    let gameName = '';
    
    if (fileName.includes('KHIII')) {
        alert("Kingdom Hearts III savefiles are not supported.");
        resetInput(input, label);
        return;
    } else if (fileName.includes('KH0.2')) {
        alert("Kingdom Hearts 0.2 savefiles are not supported.");
        resetInput(input, label);
        return;
    } else if (fileName.includes('KH3DHD')) {
        alert("Kingdom Hearts DDD savefiles are not supported.");
        resetInput(input, label);
        return;
    }

    if (fileName.includes('KHFM')) {
        gameName = 'KH1 (EGS)';
    } else if (fileName.includes('KHIIFM')) {
        gameName = 'KH2 (EGS)';
    } else if (fileName.includes('KHReCoM')) {
        gameName = 'KH: Re:COM (EGS)';
    } else if (fileName.includes('KHBbSFM')) {
        gameName = 'KH: BBS (EGS)';
    } else {
        gameName = null;
        alert("Selected file is not a valid Kingdom Hearts savefile.");
        resetInput(input, label);
        return;
    }

    if (fileName.includes('_WW')) {
        gameName = gameName.replace('EGS', 'Steam');
    }

    label.textContent = gameName ? `Selected: ${gameName}` : 'Select File';
}

function resetInput(input, label) {
    input.value = ""; // Clear the file input
    label.textContent = 'Select File'; // Reset the label
}
