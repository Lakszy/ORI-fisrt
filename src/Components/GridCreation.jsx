import React, { useState } from "react";
import { Modal, Fade, Paper, Grid, Button } from "@mui/material";

function GridCreation({ imagesData }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (img) => {
    setSelectedImage(img);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  let photo = null;
  if (imagesData && typeof imagesData === "string") {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(imagesData, "text/xml");
    const photoElements = xmlDoc.querySelectorAll("photo");

    photo = Array.from(photoElements).map((photoElement) => ({
      id: photoElement.getAttribute("id"),
      owner: photoElement.getAttribute("owner"),
      secret: photoElement.getAttribute("secret"),
      server: photoElement.getAttribute("server"),
      farm: photoElement.getAttribute("farm"),
      title: photoElement.getAttribute("title"),
      ispublic: photoElement.getAttribute("ispublic"),
      isfriend: photoElement.getAttribute("isfriend"),
      isfamily: photoElement.getAttribute("isfamily"),
    }));
  }

  return (
    <div>
      <Grid container spacing={2}>
        {photo &&
          photo.map((img) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={img.id}>
              <Paper
                className="cursor-pointer p-4 border rounded-lg transition-transform transform hover:scale-105"
                onClick={() => handleOpenModal(img)}
              >
                <img
                  src={`https://farm${img.farm}.staticflickr.com/${img.server}/${img.id}_${img.secret}.jpg`}
                  alt={img.title}
                  className="w-full h-auto"
                />
              </Paper>
            </Grid>
          ))}
      </Grid>

      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        closeAfterTransition
      >
        <Fade in={isModalOpen}>
          <div className="flex justify-center items-center h-screen">
            {selectedImage && (
              <div className="modal-content p-4 bg-white rounded-lg">
                <img
                  src={`https://farm${selectedImage.farm}.staticflickr.com/${selectedImage.server}/${selectedImage.id}_${selectedImage.secret}.jpg`}
                  alt={selectedImage.title}
                  className="w-full h-auto"
                />
                <Button
                  onClick={handleCloseModal}
                  className="bg-red-500 text-white py-2 px-4 mt-4 rounded-lg hover:bg-red-600"
                >
                  Close
                </Button>
              </div>
            )}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default GridCreation;

const url = "https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=94fdd14a300113aff95a76b9c8996483&text";
