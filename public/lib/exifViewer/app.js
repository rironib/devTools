document.getElementById("checkBtn").addEventListener("click", function () {
  handleImageSelection("fileInput", "makeAndModel", "allMetaDataSpan");
});

// Reset
function reset() {
  document.getElementById("fileInput").value = "";
  document.getElementById("result").innerHTML = "";
}

function handleImageSelection(fileInputId, makeAndModelId, metaDataSpanId) {
  const fileInput = document.getElementById(fileInputId);
  const makeAndModelSpan = document.getElementById(makeAndModelId);
  const metaDataSpan = document.getElementById(metaDataSpanId);

  if (fileInput.files.length > 0) {
    const file = fileInput.files[0];
    readExifData(file, makeAndModelSpan, metaDataSpan);
  }
}

function readExifData(file, makeAndModelSpan, metaDataSpan) {
  const reader = new FileReader();

  reader.onload = function (e) {
    const imageData = e.target.result;
    getExifData(imageData)
      .then((exifData) =>
        displayExifData(exifData, makeAndModelSpan, metaDataSpan)
      )
      .catch((error) => console.error(error));
  };

  reader.readAsDataURL(file);
}

function getExifData(imageData) {
  const img = new Image();
  img.src = imageData;

  return new Promise((resolve, reject) => {
    img.onload = function () {
      EXIF.getData(this, function () {
        const exifData = {
          make: EXIF.getTag(this, "Make"),
          model: EXIF.getTag(this, "Model"),
          Orientation: EXIF.getTag(this, "Orientation"),
          XResolution: EXIF.getTag(this, "XResolution"),
          YResolution: EXIF.getTag(this, "YResolution"),
          ResolutionUnit: EXIF.getTag(this, "ResolutionUnit"),
          Software: EXIF.getTag(this, "Software"),
          DateTime: EXIF.getTag(this, "DateTime"),
          YCbCrPositioning: EXIF.getTag(this, "YCbCrPositioning"),
          ExifIFDPointer: EXIF.getTag(this, "ExifIFDPointer"),
          GPSInfoIFDPointer: EXIF.getTag(this, "GPSInfoIFDPointer"),
          ExposureTime: EXIF.getTag(this, "ExposureTime"),
          FNumber: EXIF.getTag(this, "FNumber"),
          ExposureProgram: EXIF.getTag(this, "ExposureProgram"),
          ISOSpeedRatings: EXIF.getTag(this, "ISOSpeedRatings"),
          ExifVersion: EXIF.getTag(this, "ExifVersion"),
          DateTimeOriginal: EXIF.getTag(this, "DateTimeOriginal"),
          DateTimeDigitized: EXIF.getTag(this, "DateTimeDigitized"),
          ComponentsConfiguration: EXIF.getTag(this, "ComponentsConfiguration"),
          CompressedBitsPerPixel: EXIF.getTag(this, "CompressedBitsPerPixel"),
          ExposureBias: EXIF.getTag(this, "ExposureBias"),
          MaxApertureValue: EXIF.getTag(this, "MaxApertureValue"),
          MeteringMode: EXIF.getTag(this, "MeteringMode"),
          LightSource: EXIF.getTag(this, "LightSource"),
          Flash: EXIF.getTag(this, "Flash"),
          FocalLength: EXIF.getTag(this, "FocalLength"),
          SubsecTime: EXIF.getTag(this, "SubsecTime"),
          SubsecTimeOriginal: EXIF.getTag(this, "SubsecTimeOriginal"),
          SubsecTimeDigitized: EXIF.getTag(this, "SubsecTimeDigitized"),
          FlashpixVersion: EXIF.getTag(this, "FlashpixVersion"),
          ColorSpace: EXIF.getTag(this, "ColorSpace"),
          PixelXDimension: EXIF.getTag(this, "PixelXDimension"),
          PixelYDimension: EXIF.getTag(this, "PixelYDimension"),
          InteroperabilityIFDPointer: EXIF.getTag(
            this,
            "InteroperabilityIFDPointer"
          ),
          SensingMethod: EXIF.getTag(this, "SensingMethod"),
          FileSource: EXIF.getTag(this, "FileSource"),
          SceneType: EXIF.getTag(this, "SceneType"),
          CustomRendered: EXIF.getTag(this, "CustomRendered"),
          ExposureMode: EXIF.getTag(this, "ExposureMode"),
          WhiteBalance: EXIF.getTag(this, "WhiteBalance"),
          DigitalZoomRation: EXIF.getTag(this, "DigitalZoomRation"),
          FocalLengthIn35mmFilm: EXIF.getTag(this, "FocalLengthIn35mmFilm"),
          SceneCaptureType: EXIF.getTag(this, "SceneCaptureType"),
          GainControl: EXIF.getTag(this, "GainControl"),
          Contrast: EXIF.getTag(this, "Contrast"),
          Saturation: EXIF.getTag(this, "Saturation"),
          Sharpness: EXIF.getTag(this, "Sharpness"),
          SubjectDistanceRange: EXIF.getTag(this, "SubjectDistanceRange"),
          GPSVersionID: EXIF.getTag(this, "GPSVersionID"),
          // allMetaData: EXIF.getAllTags(this),
        };
        resolve(exifData);
      });
    };

    img.onerror = function () {
      reject("Error loading image.");
    };
  });
}

const displayExifData = (exifData) => {
  const result = document.getElementById("result");
  result.innerHTML = `
    <ul class="grid md:grid-cols-2 text-left">
      <li class="dark:bg-slate-700 text-black dark:text-white text-center text-2xl font-bold py-2 px-4 md:col-span-2  border rounded-t-md">Result</li>
      <li class="border p-2"><strong>Brand:</strong> ${exifData.make}</li>
      <li class="border p-2"><strong>Device:</strong> ${exifData.model}</li>
      <li class="border p-2"><strong>Orientation:</strong> ${exifData.Orientation}</li>
      <li class="border p-2"><strong>XResolution:</strong> ${exifData.XResolution}</li>
      <li class="border p-2"><strong>YResolution:</strong> ${exifData.YResolution}</li>
      <li class="border p-2"><strong>ResolutionUnit:</strong> ${exifData.ResolutionUnit}</li>
      <li class="border p-2"><strong>Software:</strong> ${exifData.Software}</li>
      <li class="border p-2"><strong>DateTime:</strong> ${exifData.DateTime}</li>
      <li class="border p-2"><strong>YCbCrPositioning:</strong> ${exifData.YCbCrPositioning}</li>
      <li class="border p-2"><strong>ExifIFDPointer:</strong> ${exifData.ExifIFDPointer}</li>
      <li class="border p-2"><strong>GPSInfoIFDPointer:</strong> ${exifData.GPSInfoIFDPointer}</li>
      <li class="border p-2"><strong>ExposureTime:</strong> ${exifData.ExposureTime}</li>
      <li class="border p-2"><strong>FNumber:</strong> ${exifData.FNumber}</li>
      <li class="border p-2"><strong>ExposureProgram:</strong> ${exifData.ExposureProgram}</li>
      <li class="border p-2"><strong>ISOSpeedRatings:</strong> ${exifData.ISOSpeedRatings}</li>
      <li class="border p-2"><strong>ExifVersion:</strong> ${exifData.ExifVersion}</li>
      <li class="border p-2"><strong>DateTimeOriginal:</strong> ${exifData.DateTimeOriginal}</li>
      <li class="border p-2"><strong>DateTimeDigitized:</strong> ${exifData.DateTimeDigitized}</li>
      <li class="border p-2"><strong>ComponentsConfiguration:</strong> ${exifData.ComponentsConfiguration}</li>
      <li class="border p-2"><strong>CompressedBitsPerPixel:</strong> ${exifData.CompressedBitsPerPixel}</li>
      <li class="border p-2"><strong>ExposureBias:</strong> ${exifData.ExposureBias}</li>
      <li class="border p-2"><strong>MaxApertureValue:</strong> ${exifData.MaxApertureValue}</li>
      <li class="border p-2"><strong>MeteringMode:</strong> ${exifData.MeteringMode}</li>
      <li class="border p-2"><strong>LightSource:</strong> ${exifData.LightSource}</li>
      <li class="border p-2"><strong>Flash:</strong> ${exifData.Flash}</li>
      <li class="border p-2"><strong>FocalLength:</strong> ${exifData.FocalLength}</li>
      <li class="border p-2"><strong>SubsecTime:</strong> ${exifData.SubsecTime}</li>
      <li class="border p-2"><strong>SubsecTimeOriginal:</strong> ${exifData.SubsecTimeOriginal}</li>
      <li class="border p-2"><strong>SubsecTimeDigitized:</strong> ${exifData.SubsecTimeDigitized}</li>
      <li class="border p-2"><strong>FlashpixVersion:</strong> ${exifData.FlashpixVersion}</li>
      <li class="border p-2"><strong>ColorSpace:</strong> ${exifData.ColorSpace}</li>
      <li class="border p-2"><strong>PixelXDimension:</strong> ${exifData.PixelXDimension}</li>
      <li class="border p-2"><strong>PixelYDimension:</strong> ${exifData.PixelYDimension}</li>
      <li class="border p-2"><strong>InteroperabilityIFDPointer:</strong> ${exifData.InteroperabilityIFDPointer}</li>
      <li class="border p-2"><strong>SensingMethod:</strong> ${exifData.SensingMethod}</li>
      <li class="border p-2"><strong>FileSource:</strong> ${exifData.FileSource}</li>
      <li class="border p-2"><strong>SceneType:</strong> ${exifData.SceneType}</li>
      <li class="border p-2"><strong>CustomRendered:</strong> ${exifData.CustomRendered}</li>
      <li class="border p-2"><strong>ExposureMode:</strong> ${exifData.ExposureMode}</li>
      <li class="border p-2"><strong>WhiteBalance:</strong> ${exifData.WhiteBalance}</li>
      <li class="border p-2"><strong>DigitalZoomRation:</strong> ${exifData.DigitalZoomRation}</li>
      <li class="border p-2"><strong>FocalLengthIn35mmFilm:</strong> ${exifData.FocalLengthIn35mmFilm}</li>
      <li class="border p-2"><strong>SceneCaptureType:</strong> ${exifData.SceneCaptureType}</li>
      <li class="border p-2"><strong>GainControl:</strong> ${exifData.GainControl}</li>
      <li class="border p-2"><strong>Contrast:</strong> ${exifData.Contrast}</li>
      <li class="border p-2"><strong>Saturation:</strong> ${exifData.Saturation}</li>
      <li class="border p-2"><strong>Sharpness:</strong> ${exifData.Sharpness}</li>
      <li class="border p-2"><strong>SubjectDistanceRange:</strong> ${exifData.SubjectDistanceRange}</li>
      <li class="border p-2 md:col-span-2 rounded-b-md"><strong>GPSVersionID: </strong>${exifData.GPSVersionID}</li>
    </ul>
    `;
};
