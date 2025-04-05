
interface User {
    username: string;
    email: string;
    password: string;
  }
  

  export async function openDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request: IDBOpenDBRequest = indexedDB.open("UserDatabase", 1);
  
      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains("users")) {
          db.createObjectStore("users", { keyPath: "email" });
        }
      };
  
      request.onsuccess = (event: Event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        resolve(db);
      };
  
      request.onerror = (event: Event) => {
        const error = (event.target as IDBOpenDBRequest).error;
        reject("Database error: " + (error?.message ?? "Unknown error"));
      };
    });
  }
  
 
  export async function signupUser(
    username: string,
    email: string,
    password: string
  ): Promise<string> {
    try {
      const db = await openDB();
      const transaction = db.transaction("users", "readwrite");
      const store = transaction.objectStore("users");
  
      return new Promise((resolve, reject) => {
        const getRequest = store.get(email);
  
        getRequest.onsuccess = () => {
          if (getRequest.result) {
            reject("User already exists! Please log in.");
          } else {
            const newUser: User = { username, email, password };
            const addRequest = store.add(newUser);
  
            addRequest.onsuccess = () => resolve("Signup successful!");
            addRequest.onerror = () => reject("Error signing up.");
          }
        };
  
        getRequest.onerror = () => reject("Error accessing IndexedDB.");
      });
    } catch (error) {
      throw new Error("Failed to access database.");
    }
  }
  
  
  export async function loginUser(
    email: string,
    password: string
  ): Promise<{ message: string; username: string }> {
    try {
      const db = await openDB();
      const transaction = db.transaction("users", "readonly");
      const store = transaction.objectStore("users");
  
      return new Promise((resolve, reject) => {
        const getRequest = store.get(email);
  
        getRequest.onsuccess = () => {
          const user = getRequest.result as User | undefined;
          if (user && user.password === password) {
            localStorage.setItem("username", user.username);
            localStorage.setItem("email", user.email);
            resolve({ message: "Login successful!", username: user.username });
          } else {
            reject("Invalid email or password.");
          }
        };
  
        getRequest.onerror = () => reject("Error accessing IndexedDB.");
      });
    } catch (error) {
      throw new Error("Failed to access database.");
    }
  }
  