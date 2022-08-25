import { useEffect, useState } from "react";
import { projFirestore, projStorage, timestamp } from "../firebase";

const useStorage = (file, folder, ok) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    //references
    console.log(ok);
    if (ok) {
      const storageRef = projStorage.ref(file.name);
      const collectionRef = projFirestore.collection(folder);

      //   console.log(file);
      storageRef.put(file).on(
        "state_changed",
        (snapshot) => {
          let percentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(percentage);
        },
        (err) => {
          setError(err);
        },
        async () => {
          const url = await storageRef.getDownloadURL();
          const createdAt = timestamp();
          collectionRef.add({ url, createdAt });
          setUrl(url);
        }
      );
    }
  }, [file, ok]);

  return { progress, url, error };
};

export default useStorage;
