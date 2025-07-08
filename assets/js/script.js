const meshRadios = document.querySelectorAll('input[name="meshType"]');
const gridRadios = document.querySelectorAll('input[name="gridType"]');
const frameRadios = document.querySelectorAll('input[name="frameType"]');

meshRadios.forEach(radio => {
  radio.addEventListener('change', () => {
    const gridInput = document.querySelector('input[name="gridType"]:checked');
    if (!(gridInput && gridInput.value === 'combo')) {
      gridRadios.forEach(gr => gr.checked = false);
    }
    /*gridRadios.forEach(gr => gr.checked = false);*/
  });
});

gridRadios.forEach(radio => {
  radio.addEventListener('change', () => {
    const gridInput = document.querySelector('input[name="gridType"]:checked');
    if (!(gridInput && gridInput.value === 'combo')) {
      meshRadios.forEach(mr => mr.checked = false);
    }
    /*meshRadios.forEach(mr => mr.checked = false);*/
    frameRadios.forEach(fr => fr.checked = false);
  });
});

function calculatePrice() {
  const width = parseFloat(document.getElementById("width").value);
  const height = parseFloat(document.getElementById("height").value);
  const meshInput = document.querySelector('input[name="meshType"]:checked');
  const gridInput = document.querySelector('input[name="gridType"]:checked');
  const frameInput = document.querySelector('input[name="frameType"]:checked');
  const customMeshInput = document.getElementById("customMeshPrice");
  document.getElementById("result").style.padding = '8px';

  if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
    document.getElementById("result").style.backgroundColor = "red";
    document.getElementById("result").textContent = "Пожалуйста, введите корректные размеры.";
    return;
  }

  let area = (width / 1000) * (height / 1000);
  
  if (area < 0.52) {
    area = 0.52;
  }



  let meshPrice = 0;
  if (meshInput?.value === 'custom') {
    meshPrice = parseFloat(customMeshInput.value) || 0;
  } else {
    meshPrice = meshInput ? (meshPrices[meshInput.value] || 0) : 0;
  }

  let gridPrice = gridInput ? (gridPrices[gridInput.value] || 0) : 0;

  let framePrice = 0;
  if ((meshInput && meshInput.value === 'plisse') || (gridInput && gridInput.value === 'transparent_plisse') || (gridInput && gridInput.value === 'profile') || (gridInput && gridInput.value === 'horizontal') || (gridInput && gridInput.value === 'horizontal_strong') || (gridInput && gridInput.value === 'transparent') || (gridInput && gridInput.value === 'combo') || (meshInput && meshInput.value === 'plisse_side')) {
    framePrice = 0;
  } else {
    framePrice = frameInput?.value === 'inside' ? 0 : -2000;
  }



  if (((gridInput) && (gridInput.value === 'combo'))) {
    if ( !(meshInput && meshInput.value === 'simple') && !(meshInput && meshInput.value === 'plisse') && !(meshInput && meshInput.value === 'custom') && !(meshInput && meshInput.value === 'plisse_side') ) {
      const total = Math.round((((area * meshPrice) * 30) / 100) + (area * gridPrice));
      document.getElementById("result").textContent = `Стоимость: ${total.toLocaleString()} тенге.`;
      return total;
    } else {
      const total = Math.round(area * gridPrice);
      document.getElementById("result").textContent = `Стоимость: ${total.toLocaleString()} тенге.`;
      return total;
    }
  } else {
    const total = Math.round(area * (meshPrice + gridPrice) + framePrice);
    document.getElementById("result").textContent = `Стоимость: ${total.toLocaleString()} тенге.`;
    return total;
  }

  /*const total = Math.round(area * (meshPrice + gridPrice) + framePrice);

  document.getElementById("result").textContent = `Стоимость: ${total.toLocaleString()} тенге.`;*/
}