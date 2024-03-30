import React from "react";
import userStore from "./user";

const storesContext = React.createContext({
    userStore,
});

// 默认导出
export default storesContext;