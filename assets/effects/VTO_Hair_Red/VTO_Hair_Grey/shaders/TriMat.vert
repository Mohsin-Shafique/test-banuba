#include <bnb/glsl.vert>
#include <bnb/decode_int1010102.glsl>
#include<bnb/matrix_operations.glsl>
#define bnb_IDX_OFFSET 0
#ifdef BNB_VK_1
#ifdef gl_VertexID
#undef gl_VertexID
#endif
#ifdef gl_InstanceID
#undef gl_InstanceID
#endif
#define gl_VertexID gl_VertexIndex
#define gl_InstanceID gl_InstanceIndex
#endif

BNB_LAYOUT_LOCATION(0) BNB_IN vec3 attrib_pos;


BNB_OUT(0) vec2 var_uv;
BNB_OUT(1) vec2 var_hair_mask_uv;

void main()
{
	vec2 v = attrib_pos.xy;
	gl_Position = vec4(v, 0.0, 1.0);
	var_uv = v * 0.5 + 0.5;

	mat2x3 hair_basis = mat2x3(hair_nn_transform[0].xyz, hair_nn_transform[1].xyz);
	var_hair_mask_uv = vec3(v, 1.0) * hair_basis;
	#ifdef BNB_VK_1
		var_uv.y = 1. - var_uv.y;
	#endif
}