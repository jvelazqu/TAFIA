import firebase from "firebase/app";
import "firebase/auth";
import axios from 'axios';
import {apiServer} from "@/data/config";

const auth_type = 'postgres'

export default {
  state: {
    loggedInUser:
      localStorage.getItem("userInfo") != null
        ? JSON.parse(localStorage.getItem("userInfo"))
        : null,
    loading: false,
    error: null
  },
  getters: {
    loggedInUser: state => state.loggedInUser,
    loading: state => state.loading,
    error: state => state.error
  },
  mutations: {
    setUser(state, data) {
      state.loggedInUser = data;
      state.loading = false;
      state.error = null;
    },
    setLogout(state) {
      state.loggedInUser = null;
      state.loading = false;
      state.error = null;
      // this.$router.go("/");
    },
    setLoading(state, data) {
      state.loading = data;
      state.error = null;
    },
    setError(state, data) {
      state.error = data;
      state.loggedInUser = null;
      state.loading = false;
    },
    clearError(state) {
      state.error = null;
    }
  },
  actions: {
    login({commit}, data) {
      commit("clearError");
      commit("setLoading", true);

      localStorage.removeItem("userInfo");

      if(auth_type == 'postgres'){
        
        axios
        .post(apiServer + '/api/auth/signin', 
        {
          "usr_name": data.user_name,
          "password": data.password 
        }, 
        { 
          headers: 
          { 
            'Content-Type': 'application/json' 
            }
        })
        .then(res => {
          //console.log(res.data)
          const newUser = {uid: res.data.id, username: res.data.username, fullname: res.data.full_name, email: res.data.email, group: res.data.group_id, token: res.data.token};
          
          localStorage.setItem("userInfo", JSON.stringify(newUser));          
          commit("setUser", {uid: res.data.id});
          console.log(newUser);
        })
        .catch(error => {
          localStorage.removeItem("userInfo");
          commit("setError", error);

          console.log(error.response)
          })            
        }

        if(auth_type == 'firebase'){
          firebase
            .auth()
            .signInWithEmailAndPassword(data.email, data.password)
            .then(user => {
              const newUser = {uid: user.user.uid};
              localStorage.setItem("userInfo", JSON.stringify(newUser));
              commit("setUser", {uid: user.user.uid});
              console.log("user");
            })
            .catch(function(error) {
              // Handle Errors here.
              // var errorCode = error.code;
              // var errorMessage = error.message;
              // console.log(error);
              localStorage.removeItem("userInfo");
              commit("setError", error);
              // ...
            });
        }
      
    },

    signUserUp({commit}, data) {
      commit("setLoading", true);
      commit("clearError");
      firebase
        .auth()
        .createUserWithEmailAndPassword(data.email, data.password)
        .then(user => {
          commit("setLoading", false);

          const newUser = {
            uid: user.user.uid
          };
          console.log(newUser);
          localStorage.setItem("userInfo", JSON.stringify(newUser));
          commit("setUser", newUser);
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setError", error);
          localStorage.removeItem("userInfo");
          console.log(error);
        });
    },
    signOut({commit}) {
      if(auth_type == 'firebase'){
        firebase
        .auth()
        .signOut()
        .then(
          () => {
            localStorage.removeItem("userInfo");
            commit("setLogout");
          },
          _error => {}
        );
      }

      if(auth_type == 'postgres'){
        //console.log(JSON.parse(localStorage.getItem("userInfo")))    
        localStorage.removeItem("userInfo");
        commit("setLogout");
      }
      
    }
  }
};
