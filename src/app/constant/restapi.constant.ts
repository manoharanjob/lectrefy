export const BASE_PATH='http://209.97.130.34/lectrefy-api-service/'
// export const BASE_PATH='http://192.168.0.5/lectrefy-api-service/'

export const LoginApi =  {
        login: BASE_PATH + 'api/v1.0/login'
}

export const CampaignApi = {
        getCampaigns: BASE_PATH+'api/v1.0/campaigns/filter?userId=',
        getCampaign: BASE_PATH+'api/v1.0/campaigns/',
        addCampaign: BASE_PATH+'api/v1.0/campaigns',
        updateCampaign: BASE_PATH+'api/v1.0/campaigns/',
        deleteCampaign: BASE_PATH+'api/v1.0/campaigns/',
        getContents: BASE_PATH+'api/v1.0/contents/filter?userId=',
        getMappedContents: BASE_PATH+'api/v1.0/campaignhascontents/filter?campaignId=',
        mapContent: BASE_PATH+'api/v1.0/campaignhascontents',
        deleteContent: BASE_PATH+'api/v1.0/contents',
        getMediaTypes: BASE_PATH+'api/v1.0/codedatasets/filter?codeType=mediatype',
        getBrands: BASE_PATH+'api/v1.0/codedatasets/filter?codeType=brand',
        getSubBrands: BASE_PATH+'api/v1.0/codedatasets/filter?codeType=subbrand&codeKeyTwo=',
        getCategories: BASE_PATH+'api/v1.0/codedatasets/filter?codeType=adcategory',
}

export const InventoryApi = {
        getInventories: BASE_PATH+'api/v1.0/bookedtimes/filter?userId=',
        getMappedCampaigns: BASE_PATH+'api/v1.0/campaignhasbookeds/filter?bookedTimeId=',
        getCampaigns: BASE_PATH+'api/v1.0/campaigns/filter?userId=',
        mapCampaign: BASE_PATH+'api/v1.0/campaignhasbookeds'
}

export const ContentApi = {
        getContents: BASE_PATH+'api/v1.0/contents/filter?userId=',
        getContent: BASE_PATH+'api/v1.0/contents',
        addContent: BASE_PATH+'api/v1.0/contents',
        updateContent: BASE_PATH+'api/v1.0/contents/',
        deleteContent: BASE_PATH+'api/v1.0/contents/',
        imageUpload: BASE_PATH +'api/v1.0/uploadfile',
        getCategories: BASE_PATH+'api/v1.0/codedatasets/filter?codeType=adcategory',
        getSubCategories: BASE_PATH+'api/v1.0/codedatasets/filter?codeType=adsubcategory&codeKeyTwo='
}
