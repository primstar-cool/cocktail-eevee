
import CktlV3 from "../../cocktail/@compile/@types/framework.d"

interface GenInterface_index_userInfo_complex_a {
  b: number;
}
interface GenInterface_index_userInfo_complex {
  z: number;
  a: GenInterface_index_userInfo_complex_a;
  c: string;
}

export interface GenInterface_index_userInfo {
  avatarUrl: string;
  nickName: string;
  complex: GenInterface_index_userInfo_complex;
}


export interface PageBase_index extends CktlV3.PageBaseWithMixed<PageBase_index> {

  bindViewTap: () => void;
  data: {
    userInfo: {
      avatarUrl: string;
      nickName: string;
      complex: {
        z: number;
        a?: { b: number; };
        c: string;
      };
    };
    sharePageData: number;
  }
}// index.ts

