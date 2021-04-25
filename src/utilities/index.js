const updatefield = (value, field, children) => {
  //console.log("updatemaster triggered");
  let expobject = value;
  const objectKey = Object.keys(value);
  //console.log(expobject, objectKey, field, children);
  objectKey.forEach((key) =>
    key === field ? (expobject[field] = children) : ""
  );
  console.log(expobject);
  return expobject;
};
export const updateMaster = (idx, workExperience, setWorkExperience) => (
  field,
  children
) => {
  //console.log("innerupdate triggered");
  setWorkExperience(
    workExperience.map((value, i) =>
      i === idx ? updatefield(value, field, children) : value
    )
  );
};

export const convertBase64 = (imgfile) => {
  return new Promise((resolve, reject) => {
    if (!imgfile) return resolve("");
    const fileReader = new FileReader();
    fileReader.readAsDataURL(imgfile);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};
