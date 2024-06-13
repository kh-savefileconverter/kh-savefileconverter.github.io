function copyHexOffsets() {
    const fileInput1 = document.getElementById('file1').files[0];
    const fileInput2 = document.getElementById('file2').files[0];

    if (!fileInput1 || !fileInput2) {
        alert("Please select two files.");
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

            const downloadLink1 = document.getElementById('download1');
            downloadLink1.href = URL.createObjectURL(blob1);
            downloadLink1.download = fileInput2.name;
            downloadLink1.style.display = 'block';
        };

        reader2.readAsArrayBuffer(fileInput2);
    };

    reader1.readAsArrayBuffer(fileInput1);
}
