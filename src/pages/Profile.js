import React from "react";
import { useState } from "react";
import { Text, Button, Portal, Modal, Appbar } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import usePreferences from "../contexts/usePreferences";
import AppbarHeader from "../components/AppbarHeader";
import {
  Image,
  StyleSheet,
  View,
  Dimensions,
  Pressable,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { TouchableOpacity } from "react-native";

const Profile = ({ navigation }) => {
  const { toggleTheme, isThemeDark, theme } = usePreferences();
  const [photoModalVisible, setphotoModalVisible] = useState();
  const [uploadModalVisible, setUploadModalVisible] = useState();
  const [image, setImage] = useState();

  const placeHolderImg = require("../../assets/images/cat_img.jpg");

  const styles = StyleSheet.create({
    headerText: {
      color: "white",
      fontSize: 14,
      margin: 10,
      fontWeight: "800",
    },
    image: {
      width: Dimensions.get("window").width * 0.4,
      height: Dimensions.get("window").height * 0.2,
      resizeMode: "cover",
    },
    imgContainer: {
      overflow: "hidden",
      position: "absolute",
      borderRadius: 100,
      borderWidth: 5,
      borderColor: "white",
      top: Dimensions.get("window").height * 0.04,
      start: Dimensions.get("window").width * 0.3,
    },
    container: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: "black",
    },
    viewUpperPart: {
      flex: 2, // 30% of the screen height
      backgroundColor: "black",
      justifyContent: "center",
      alignItems: "center",
      overflow: "visible",
    },
    viewLowerPart: {
      flex: 7, // 70% of the screen height
      backgroundColor: isThemeDark ? "#1e1e1e" : "white",
      flexDirection: "column",
    },
    button: {
      minWidth: 150,
      width: "60%",
      maxWidth: 200,
      backgroundColor: "black",
      margin: 10,
      justifyContent: "center",
      textAlign: "center",
    },
    title: {
      fontSize: 30,
      fontWeight: "bold",
      color: theme.colors.textColor,
    },
    titleView: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: Dimensions.get("window").height * 0.1,
    },
    profileProperty: {
      flexDirection: "column",
      justifyContent: "center",
      marginTop: 50,
      width: "auto",
    },
    backButtonView: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: "auto",
      marginBottom: "auto",
    },
    photoModel: {
      backgroundColor: "black",
      flex: 1,
      alignItems: "center",
    },
    uploadModel: {
      backgroundColor: theme.colors.backgroundColor,
      width: 280,
      height: 130,
      alignItems: "center",
      borderRadius: 25,
      left: Dimensions.get("screen").width * 0.5 - 140,
      top: Dimensions.get("screen").height * 0.5 - 65,
    },
    uploadModalContainer: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
    },
    modalImage: {
      width: Dimensions.get("screen").width,
      height: "auto",
      aspectRatio: 1,
      marginBottom: 70,
    },
    uploadModalIconShape: {
      overflow: "hidden",
      borderRadius: 100,
      borderWidth: 2,
      borderColor: "gray",
      height: 70,
      width: 70,
      justifyContent: "center",
      alignItems: "center",
    },
    uploadModelIconView: {
      height: "auto",
      flexDirection: "column",
      paddingTop: 15,
      alignItems: "center",
      marginLeft: 15,
      marginRight: 15,
    },
    uploadModalIconText: {
      color: theme.colors.textColor,
      fontSize: 15,
      marginTop: 5,
    },
  });

  const ProfileProperty = ({ label, info, iconName, iconSize }) => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
        width: "auto",
      }}
    >
      <FontAwesome
        name={iconName}
        size={iconSize}
        style={{ marginHorizontal: 20, color: theme.colors.textColor }}
        color={theme.colors.textColor}
      />
      <View
        style={{
          justifyContent: "center",
          width: "70%",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            color: theme.colors.textColor,
            fontWeight: "800",
            margin: 2,
          }}
        >
          {label}
        </Text>
        <Text
          style={{
            fontSize: 16,
            margin: 2,
            borderColor: theme.colors.textColor,
            borderBottomWidth: 1,
          }}
        >
          {info}
        </Text>
      </View>
    </View>
  );

  openPhotoModal = () => {
    setphotoModalVisible(true);
  };
  closePhotoModal = () => {
    setphotoModalVisible(false);
  };

  openUploadModal = () => {
    setUploadModalVisible(true);
  };
  closeUploadModal = () => {
    setUploadModalVisible(false);
  };

  onCameraIconClick = () => {
    uploadImage();
  };
  onGalleryIconClick = () => {
    uploadImage("gallery");
  };

  const ImageComponent = ({ uri, style, placeHolder }) => (
    <Image source={uri ? { uri } : placeHolder} style={style} />
  );

  const UploadAction = ({ iconName, children, onPress }) => (
    <View style={styles.uploadModelIconView}>
      <TouchableOpacity style={styles.uploadModalIconShape} onPress={onPress}>
        <FontAwesome name={iconName} size={20} color={theme.colors.textColor} />
      </TouchableOpacity>
      <Text style={styles.uploadModalIconText}>{children}</Text>
    </View>
  );

  const removeImage = async () => {
    try {
      saveImage(false);
    } catch ({ message }) {
      alert(message);
      setUploadModalVisible(false);
    }
  };

  const uploadImage = async (mode) => {
    try {
      let result = {};
      if (mode == "gallery") {
        await ImagePicker.requestMediaLibraryPermissionsAsync();
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
      } else {
        await ImagePicker.requestCameraPermissionsAsync();
        result = await ImagePicker.launchCameraAsync({
          cameraType: ImagePicker.CameraType.front,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
      }
      if (!result.canceled) {
        await saveImage(result.assets[0].uri);
      }
    } catch (error) {
      alert("Error uploadin image" + error.message);
      setUploadModalVisible(false);
    }
  };

  const saveImage = async (img) => {
    try {
      setImage(img);
      setUploadModalVisible(false);
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <StatusBar style={"light"} backgroundColor={"black"} />
      <AppbarHeader
        headerStyle={{
          justifyContent: "space-between",
          marginTop: 10,
          backgroundColor: "black",
        }}
        show={true}
        content={
          <>
            <Text
              onPress={() => navigation.navigate("ProfileUpdate")}
              style={{ ...styles.headerText }}
            >
              Düzenle
            </Text>
            <Text style={{ ...styles.headerText, fontSize: 30 }}>
              Profil{"  "}
            </Text>
            <Text style={styles.headerText}>Çıkış</Text>
          </>
        }
      />
      <View style={styles.container}>
        <View style={styles.viewUpperPart}></View>
        <View style={styles.viewLowerPart}>
          <View style={styles.titleView}>
            <Text style={styles.title}>Zafer Bacaksız</Text>
          </View>

          <View style={styles.profileProperty}>
            <ProfileProperty
              iconName={"phone"}
              iconSize={25}
              label={"Telefon Numarası"}
              info={"547 846 3574"}
            />
            <ProfileProperty
              iconName={"envelope"}
              iconSize={18}
              label={"Mail Adresi"}
              info={"Benbuy@gmail.com.tr"}
            />
            <ProfileProperty
              iconName={"lock"}
              iconSize={25}
              label={"Şifre"}
              info={"Görüntülemek için tıklayın"}
            />
          </View>

          <View style={styles.backButtonView}>
            <Button
              mode="contained"
              style={styles.button}
              contentStyle={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
              textColor="white"
              onPress={() => navigation.navigate("Home")}
            >
              Geri
            </Button>
          </View>
        </View>

        <View style={styles.imgContainer}>
          <Pressable onPress={openPhotoModal}>
            <ImageComponent
              uri={image}
              style={styles.image}
              placeHolder={placeHolderImg}
            />
          </Pressable>
        </View>
      </View>
      <Portal>
        <Modal
          visible={photoModalVisible}
          onDismiss={closePhotoModal}
          dismissableBackButton={true}
          style={styles.photoModel}
        >
          <AppbarHeader
            headerStyle={{
              justifyContent: "space-between",
              backgroundColor: theme.colors.backgroundColor,
              alignItems: "flext-start",
            }}
            show={photoModalVisible}
            content={
              <>
                <Appbar.BackAction
                  onPress={closePhotoModal}
                  size={30}
                  color={theme.colors.textColor}
                />
                <Appbar.Action
                  icon={"camera"}
                  size={30}
                  color={theme.colors.textColor}
                  onPress={openUploadModal}
                />
              </>
            }
          />
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              backgroundColor: theme.colors.backgroundColor,
            }}
          >
            <ImageComponent
              uri={image}
              style={styles.modalImage}
              placeHolder={placeHolderImg}
            />
          </View>
        </Modal>
        <Modal
          visible={uploadModalVisible}
          onDismiss={closeUploadModal}
          dismissableBackButton={true}
          style={styles.uploadModel}
        >
          <View style={styles.uploadModalContainer}>
            <UploadAction
              iconName={"folder"}
              onPress={() => uploadImage("gallery")}
            >
              Galeri
            </UploadAction>
            <UploadAction iconName={"camera"} onPress={uploadImage}>
              Kamera
            </UploadAction>
            <UploadAction iconName={"trash"} onPress={removeImage}>
              Sil
            </UploadAction>
          </View>
        </Modal>
      </Portal>
    </>
  );
};

export default Profile;
