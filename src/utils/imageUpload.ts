export const updateProfileImage = (e) => {
  e.preventDefault();
  const updateImage = e.target.files[0];
  const fileReader = new FileReader();
  fileReader.readAsDataURL(updateImage);
  fileReader.onloadend = function (event) {
    const base64String = (event.target?.result as string).replace(
      /^data:image\/(png|jpg);base64,/,
      ""
    );
  };
};
