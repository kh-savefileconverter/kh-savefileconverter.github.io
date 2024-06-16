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
    } else if (!areBaseNamesSame(fileInput1.name, fileInput2.name)) {
        alert("Savefiles are not of the same game or the filename is modified.");
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

            // Copy offsets from 00000000 to 00000160 while retaining specific bytes
            for (let i = 0; i <= 0x160; i++) {
                if ((i >= 0x70 && i <= 0x7F) || (i >= 0xB0 && i <= 0xBC)) {
                    continue; // Skip these ranges to retain original bytes
                }
                if (i === 0x80 || i === 0x81) {
                    continue; // Skip these bytes to retain the original bytes
                }
                uint8Array1[i] = uint8Array2[i];
            }

            // Replace bytes at offset 006AB060
            const offset = 0x6AB060;
            for (let i = 0; i < 4; i++) {
                uint8Array1[offset + i] = uint8Array2[offset + i];
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
