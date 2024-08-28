#include <bnb/glsl.frag>


BNB_IN(0) vec2 var_uv;
BNB_IN(1) vec2 var_hair_strand_mask_uv;


vec4 js_strand_colors[5] = vec4[](
    vec4(0.739, 0.43, 0.74, 1.0),
    vec4(0.764, 0.40, 0.65, 1.0),
    vec4(0.869, 0.15, 0.88, 1.0),
    vec4(0.844, 0.32, 0.92, 1.0),
    vec4(0.847, 0.47, 0.89, 1.0)
);


BNB_DECLARE_SAMPLER_2D(0, 1, glfx_HAIR_STRAND_MASK);

vec4 cubic(float v)
{
    vec4 n = vec4(1.0, 2.0, 3.0, 4.0) - v;
    vec4 s = n * n * n;
    float x = s.x;
    float y = s.y - 4.0 * s.x;
    float z = s.z - 4.0 * s.y + 6.0 * s.x;
    float w = 6.0 - x - y - z;
    return vec4(x, y, z, w) * (1.0/6.0);
}

vec4 textureBicubic(BNB_DECLARE_SAMPLER_2D_ARGUMENT(sampler), vec2 texCoords)
{
   vec2 texSize = vec2(textureSize(BNB_SAMPLER_2D(sampler), 0));
   vec2 invTexSize = 1.0 / texSize;
   
   texCoords = texCoords * texSize - 0.5;

   
    vec2 fxy = fract(texCoords);
    texCoords -= fxy;

    vec4 xcubic = cubic(fxy.x);
    vec4 ycubic = cubic(fxy.y);

    vec4 c = texCoords.xxyy + vec2(-0.5, +1.5).xyxy;
    
    vec4 s = vec4(xcubic.xz + xcubic.yw, ycubic.xz + ycubic.yw);
    vec4 offset = c + vec4(xcubic.yw, ycubic.yw) / s;
    
    offset *= invTexSize.xxyy;
    
    vec4 sample0 = BNB_TEXTURE_2D(BNB_SAMPLER_2D(sampler), offset.xz);
    vec4 sample1 = BNB_TEXTURE_2D(BNB_SAMPLER_2D(sampler), offset.yz);
    vec4 sample2 = BNB_TEXTURE_2D(BNB_SAMPLER_2D(sampler), offset.xw);
    vec4 sample3 = BNB_TEXTURE_2D(BNB_SAMPLER_2D(sampler), offset.yw);

    float sx = s.x / (s.x + s.y);
    float sy = s.z / (s.z + s.w);

    return mix(
       mix(sample3, sample2, sx), mix(sample1, sample0, sx)
    , sy);
}

void main()
{
    vec2 texture_size = vec2(textureSize(BNB_SAMPLER_2D(glfx_HAIR_STRAND_MASK), 0));
    float mask = texelFetch(BNB_SAMPLER_2D(glfx_HAIR_STRAND_MASK), ivec2(var_hair_strand_mask_uv * texture_size + 0.5), 0).x;

    int cluster = int(mask * 255.0);

    cluster %= 5;
    /*
    float s_value_list = 0.8;
    float v_value_list = 0.8;
    float h_value_range_list = 0.5;
    float h_value_center_list = 0.5;

    float h_value = (1.0 / 4.0) * float(cluster);

    float h = (h_value_center_list + h_value_range_list * h_value);
    vec3 color = vec3(h, s_value_list, v_value_list);
*/
    bnb_FragColor = js_strand_colors[cluster];
//    bnb_FragColor = vec4(1.0);
}
