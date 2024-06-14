function areBaseNamesSame(name1, name2) {
    const baseName1 = name1.split('.')[0].split('_')[0];
    const baseName2 = name2.split('.')[0].split('_')[0];
    return baseName1 === baseName2;
}

function copyHexOffsets() {
    const fileInput1 = document.getElementById('file1').files[0];
    const fileInput2 = document.getElementById('file2').files[0];

    if (!fileInput1 || !fileInput2) {
        alert("Please select two files.");
        return;
    }
	else if (fileInput1.name.startsWith('KHIII')){
		alert("Kingdom Hearts III savefiles are not supported.");
		return;
	}
	else if (fileInput1.name.startsWith('KH0.2')){
		alert("Kingdom Hearts 0.2 savefiles are not supported.");
		return;
	}
	else if (fileInput1.name.startsWith('KH3DHD')){
		alert("Kingdom Hearts DDD savefiles are not supported.");
		return;
	}
	else if ((fileInput1.name.startsWith('KH') && !fileInput1.name.endsWith('.png')) && (!fileInput2.name.startsWith('KH') && !fileInput2.name.endsWith('.png'))){
		alert("The files selected are not Kingdom Hearts savefiles.");
	}
	else if (!fileInput1.name.startsWith('KH') && !fileInput1.name.endsWith('.png')){
		alert("File 1 (Convert from slot) is not a Kingdom Hearts savefile.");
		return;
	}
	else if (!fileInput2.name.startsWith('KH') && !fileInput2.name.endsWith('.png')){
		alert("File 2 (Convert to slot) is not a Kingdom Hearts savefile.");
		return;
	}
    else if (!areBaseNamesSame(fileInput1.name, fileInput2.name)) {
        alert("Savefiles are not of the same game.");
        return;
    }

    const reader1 = new FileReader();
    const reader2 = new FileReader();

    reader1.onload = function (e1) {
        const arrayBuffer1 = e1.target.result;
        const uint8Array1 = new Uint8Array(arrayBuffer1);

        reader2.onload = function (e2) {
            const arrayBuffer2 = e2.target.result;
            const uint8Array2 = new Uint8Array(arrayBuffer2);

            // Copy offsets from 00000000 to 00000150
            for (let i = 0; i <= 0x150; i++) {
                uint8Array1[i] = uint8Array2[i];
            }

            // Create new file
            const blob1 = new Blob([uint8Array1], { type: 'application/octet-stream' });
            const downloadUrl = URL.createObjectURL(blob1);

            // Trigger download
            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = fileInput2.name;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(downloadUrl);
        };

        reader2.readAsArrayBuffer(fileInput2);
    };

    reader1.readAsArrayBuffer(fileInput1);
}
