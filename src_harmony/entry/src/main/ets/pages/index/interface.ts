
import CktlV3 from "../../cocktail/@union/core/cktlv3"

export interface GenInterface_index_pageData_userInfo_complex_aaaa {
  b: number;
}

export interface GenInterface_index_pageData_userInfo_complex {
  z: number;
  aaaa?: GenInterface_index_pageData_userInfo_complex_aaaa;
  c: string;
}

export interface GenInterface_index_pageData_userInfo {
  avatarUrl: string;
  nickName: string;
  complex: GenInterface_index_pageData_userInfo_complex;
}

export interface GenInterface_index_pageData {
  userInfo: GenInterface_index_pageData_userInfo; /*define in page.data*/
  sharePageData: number; /*define in page.data*/
  text?: string; /*define mixed bottom_text*/
}


export interface PageBase_index extends CktlV3.IPageBaseWithMixed<PageBase_index> {

  bindViewTap: () => void;
  data: {
    userInfo: GenInterface_index_pageData_userInfo;
    sharePageData: number;
    text?: string;
  }
}// index.ts

