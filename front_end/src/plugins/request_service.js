/*
 * MODULE NAME: REQUEST_SERIVCE
 * PROGRAMMER: YUE KA LONG
 * VERSION: 1.0 (16 MAY 2020)
 *
 * PURPOSE: THIS IS AXIOS DOCUMENT WHICH HELPS TO HANDLE THE APPLICATION'S AJAX REQUESTS
 *
 */
import axios from "axios";

export const service = axios.create({
  baseURL: "http://localhost:3000", //process.env.VUE_APP_BACKEND,
  timeout: 30000
});
