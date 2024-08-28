function Effect() {
  this.init = function () {
    Api.meshfxMsg("spawn", 0, 0, "tri.bsm2");
    // color in HSV color space for red
    Api.meshfxMsg("shaderVec4", 0, 0, "0.0 1.0 1.0 1.0");
    Api.meshfxMsg("shaderVec4", 0, 1, "0.0 1.0 1.0 1.0");
    Api.meshfxMsg("shaderVec4", 0, 2, "0.0 1.0 1.0 1.0");
    Api.meshfxMsg("shaderVec4", 0, 3, "0.0 1.0 1.0 1.0");
    Api.meshfxMsg("shaderVec4", 0, 4, "0.0 1.0 1.0 1.0");

    Api.showRecordButton();
  };
  this.faceActions = [];
  this.noFaceActions = [];
  this.videoRecordStartActions = [];
  this.videoRecordFinishActions = [];
  this.videoRecordDiscardActions = [];
}

configure(new Effect());
