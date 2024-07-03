
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

export interface GenInterface_index_pageMethods {
  bindViewTap: (a: number, b: string) => unknown; /*define in page*/
  onTapText?: CktlV3.PageEventMethod; /*define mixed bottom_text*/
  test?: CktlV3.PageEventMethod; /*define mixed bottom_text*/
}



export interface IPageBase_index extends CktlV3.IPageBaseWithMixed, GenInterface_index_pageMethods {
  
  data: GenInterface_index_pageData;
}// index.ts

