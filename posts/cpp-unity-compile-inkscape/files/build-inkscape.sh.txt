# set -x
set -e

mkdir -p __build
pushd __build

mkdir -p install_dir/share/locale
SRC=$(realpath ..)/src


CFLAGS="-std=c++20"
# CFLAGS="$CFLAGS -g"
CFLAGS="$CFLAGS -Wno-deprecated"
CFLAGS="$CFLAGS -Wno-deprecated-declarations"
CFLAGS="$CFLAGS -DWITH_IMAGE_MAGICK=OFF -DWITH_GRAPHICS_MAGICK=ON"


#-------------------------------------------------------------------------------------------
#-------------------------------------------------------------------------------------------
#-------------------------------------------------------------------------------------------
START_MEASUREMENT () {
    GLOBAL_CURRENT_START_TIME=`date +%s.%N`
    GLOBAL_MEASURE_NAME=$1
}
END_MEASUREMENT () {
    current_time=`date +%s.%N`
    runtime=$( echo "$current_time - $GLOBAL_CURRENT_START_TIME" | bc -l )
    echo $GLOBAL_MEASURE_NAME: $runtime seconds
}
#--------------------------------------------------------------------------------------------
#--------------------------------------------------------------------------------------------
#--------------------------------------------------------------------------------------------
START_MEASUREMENT  'Copy data files'
mkdir -p install_dir/share/inkscape/
cp -r ../share/* install_dir/share/inkscape/
cp $SRC/../config.h.cmake $SRC/../__generated/config.h

PROJECT_NAME='inkscape'
PACKAGE_LOCALE_DIR='share/locale'
CMAKE_INSTALL_PREFIX=$(realpath .)/install_dir
INKSCAPE_DATADIR=$CMAKE_INSTALL_PREFIX/share

sed -i 's/cmakedefine/define/g' $SRC/../__generated/config.h
sed -i "s/\${PROJECT_NAME}/$PROJECT_NAME/g" $SRC/../__generated/config.h
sed -i "s#\${PACKAGE_LOCALE_DIR}#$PACKAGE_LOCALE_DIR#g" $SRC/../__generated/config.h
sed -i "s#\${CMAKE_INSTALL_PREFIX}#$CMAKE_INSTALL_PREFIX#g" $SRC/../__generated/config.h
sed -i "s#\${INKSCAPE_DATADIR}#$INKSCAPE_DATADIR#g" $SRC/../__generated/config.h
END_MEASUREMENT
# #--------------------------------------------------------------------------------------------
# #--------------------------------------------------------------------------------------------
# #--------------------------------------------------------------------------------------------




START_MEASUREMENT  'Compiling lib2geom.so'
CFLAGS_2GEOM=$CFLAGS
CFLAGS_2GEOM="$CFLAGS_2GEOM -I../src/3rdparty/2geom/include/"
CFLAGS_2GEOM="$CFLAGS_2GEOM $(pkg-config --cflags glib-2.0)"
g++ -c -fPIC $CFLAGS_2GEOM ../src/3rdparty/2geom/src/2geom/affine.cpp -o src_3rdparty_2geom_src_2geom_affine.o
g++ -c -fPIC $CFLAGS_2GEOM ../src/3rdparty/2geom/src/2geom/basic-intersection.cpp -o src_3rdparty_2geom_src_2geom_basic-intersection.o
g++ -c -fPIC $CFLAGS_2GEOM ../src/3rdparty/2geom/src/2geom/bezier.cpp -o src_3rdparty_2geom_src_2geom_bezier.o
g++ -c -fPIC $CFLAGS_2GEOM ../src/3rdparty/2geom/src/2geom/bezier-clipping.cpp -o src_3rdparty_2geom_src_2geom_bezier-clipping.o
g++ -c -fPIC $CFLAGS_2GEOM ../src/3rdparty/2geom/src/2geom/bezier-curve.cpp -o src_3rdparty_2geom_src_2geom_bezier-curve.o
g++ -c -fPIC $CFLAGS_2GEOM ../src/3rdparty/2geom/src/2geom/bezier-utils.cpp -o src_3rdparty_2geom_src_2geom_bezier-utils.o
g++ -c -fPIC $CFLAGS_2GEOM ../src/3rdparty/2geom/src/2geom/cairo-path-sink.cpp -o src_3rdparty_2geom_src_2geom_cairo-path-sink.o
g++ -c -fPIC $CFLAGS_2GEOM ../src/3rdparty/2geom/src/2geom/circle.cpp -o src_3rdparty_2geom_src_2geom_circle.o
g++ -c -fPIC $CFLAGS_2GEOM ../src/3rdparty/2geom/src/2geom/concepts.cpp -o src_3rdparty_2geom_src_2geom_concepts.o
g++ -c -fPIC $CFLAGS_2GEOM ../src/3rdparty/2geom/src/2geom/conicsec.cpp -o src_3rdparty_2geom_src_2geom_conicsec.o
g++ -c -fPIC $CFLAGS_2GEOM ../src/3rdparty/2geom/src/2geom/conic_section_clipper_impl.cpp -o src_3rdparty_2geom_src_2geom_conic_section_clipper_impl.o
g++ -c -fPIC $CFLAGS_2GEOM ../src/3rdparty/2geom/src/2geom/convex-hull.cpp -o src_3rdparty_2geom_src_2geom_convex-hull.o
g++ -c -fPIC $CFLAGS_2GEOM ../src/3rdparty/2geom/src/2geom/coord.cpp -o src_3rdparty_2geom_src_2geom_coord.o
g++ -c -fPIC $CFLAGS_2GEOM ../src/3rdparty/2geom/src/2geom/crossing.cpp -o src_3rdparty_2geom_src_2geom_crossing.o
g++ -c -fPIC $CFLAGS_2GEOM ../src/3rdparty/2geom/src/2geom/curve.cpp -o src_3rdparty_2geom_src_2geom_curve.o
g++ -c -fPIC $CFLAGS_2GEOM ../src/3rdparty/2geom/src/2geom/d2-sbasis.cpp -o src_3rdparty_2geom_src_2geom_d2-sbasis.o
g++ -c -fPIC $CFLAGS_2GEOM ../src/3rdparty/2geom/src/2geom/ellipse.cpp -o src_3rdparty_2geom_src_2geom_ellipse.o
g++ -c -fPIC $CFLAGS_2GEOM ../src/3rdparty/2geom/src/2geom/elliptical-arc.cpp -o src_3rdparty_2geom_src_2geom_elliptical-arc.o
g++ -c -fPIC $CFLAGS_2GEOM ../src/3rdparty/2geom/src/2geom/elliptical-arc-from-sbasis.cpp -o src_3rdparty_2geom_src_2geom_elliptical-arc-from-sbasis.o
g++ -c -fPIC $CFLAGS_2GEOM ../src/3rdparty/2geom/src/2geom/geom.cpp -o src_3rdparty_2geom_src_2geom_geom.o
g++ -c -fPIC $CFLAGS_2GEOM ../src/3rdparty/2geom/src/2geom/intersection-graph.cpp -o src_3rdparty_2geom_src_2geom_intersection-graph.o
g++ -c -fPIC $CFLAGS_2GEOM ../src/3rdparty/2geom/src/2geom/line.cpp -o src_3rdparty_2geom_src_2geom_line.o
g++ -c -fPIC $CFLAGS_2GEOM ../src/3rdparty/2geom/src/2geom/nearest-time.cpp -o src_3rdparty_2geom_src_2geom_nearest-time.o
g++ -c -fPIC $CFLAGS_2GEOM ../src/3rdparty/2geom/src/2geom/numeric/matrix.cpp -o src_3rdparty_2geom_src_2geom_numeric_matrix.o
g++ -c -fPIC $CFLAGS_2GEOM ../src/3rdparty/2geom/src/2geom/parallelogram.cpp -o src_3rdparty_2geom_src_2geom_parallelogram.o
g++ -c -fPIC $CFLAGS_2GEOM ../src/3rdparty/2geom/src/2geom/parting-point.cpp -o src_3rdparty_2geom_src_2geom_parting-point.o
g++ -c -fPIC $CFLAGS_2GEOM ../src/3rdparty/2geom/src/2geom/path-extrema.cpp -o src_3rdparty_2geom_src_2geom_path-extrema.o
g++ -c -fPIC $CFLAGS_2GEOM ../src/3rdparty/2geom/src/2geom/path-intersection.cpp -o src_3rdparty_2geom_src_2geom_path-intersection.o
g++ -c -fPIC $CFLAGS_2GEOM ../src/3rdparty/2geom/src/2geom/path-sink.cpp -o src_3rdparty_2geom_src_2geom_path-sink.o
g++ -c -fPIC $CFLAGS_2GEOM ../src/3rdparty/2geom/src/2geom/path.cpp -o src_3rdparty_2geom_src_2geom_path.o
g++ -c -fPIC $CFLAGS_2GEOM ../src/3rdparty/2geom/src/2geom/pathvector.cpp -o src_3rdparty_2geom_src_2geom_pathvector.o
g++ -c -fPIC $CFLAGS_2GEOM ../src/3rdparty/2geom/src/2geom/piecewise.cpp -o src_3rdparty_2geom_src_2geom_piecewise.o
g++ -c -fPIC $CFLAGS_2GEOM ../src/3rdparty/2geom/src/2geom/point.cpp -o src_3rdparty_2geom_src_2geom_point.o
g++ -c -fPIC $CFLAGS_2GEOM ../src/3rdparty/2geom/src/2geom/polynomial.cpp -o src_3rdparty_2geom_src_2geom_polynomial.o
g++ -c -fPIC $CFLAGS_2GEOM ../src/3rdparty/2geom/src/2geom/rect.cpp -o src_3rdparty_2geom_src_2geom_rect.o
g++ -c -fPIC $CFLAGS_2GEOM ../src/3rdparty/2geom/src/2geom/recursive-bezier-intersection.cpp -o src_3rdparty_2geom_src_2geom_recursive-bezier-intersection.o
g++ -c -fPIC $CFLAGS_2GEOM ../src/3rdparty/2geom/src/2geom/sbasis-2d.cpp -o src_3rdparty_2geom_src_2geom_sbasis-2d.o
g++ -c -fPIC $CFLAGS_2GEOM ../src/3rdparty/2geom/src/2geom/sbasis-geometric.cpp -o src_3rdparty_2geom_src_2geom_sbasis-geometric.o
g++ -c -fPIC $CFLAGS_2GEOM ../src/3rdparty/2geom/src/2geom/sbasis-math.cpp -o src_3rdparty_2geom_src_2geom_sbasis-math.o
g++ -c -fPIC $CFLAGS_2GEOM ../src/3rdparty/2geom/src/2geom/sbasis-poly.cpp -o src_3rdparty_2geom_src_2geom_sbasis-poly.o
g++ -c -fPIC $CFLAGS_2GEOM ../src/3rdparty/2geom/src/2geom/sbasis-roots.cpp -o src_3rdparty_2geom_src_2geom_sbasis-roots.o
g++ -c -fPIC $CFLAGS_2GEOM ../src/3rdparty/2geom/src/2geom/sbasis-to-bezier.cpp -o src_3rdparty_2geom_src_2geom_sbasis-to-bezier.o
g++ -c -fPIC $CFLAGS_2GEOM ../src/3rdparty/2geom/src/2geom/sbasis.cpp -o src_3rdparty_2geom_src_2geom_sbasis.o
g++ -c -fPIC $CFLAGS_2GEOM ../src/3rdparty/2geom/src/2geom/self-intersect.cpp -o src_3rdparty_2geom_src_2geom_self-intersect.o
g++ -c -fPIC $CFLAGS_2GEOM ../src/3rdparty/2geom/src/2geom/solve-bezier.cpp -o src_3rdparty_2geom_src_2geom_solve-bezier.o
g++ -c -fPIC $CFLAGS_2GEOM ../src/3rdparty/2geom/src/2geom/solve-bezier-one-d.cpp -o src_3rdparty_2geom_src_2geom_solve-bezier-one-d.o
g++ -c -fPIC $CFLAGS_2GEOM ../src/3rdparty/2geom/src/2geom/solve-bezier-parametric.cpp -o src_3rdparty_2geom_src_2geom_solve-bezier-parametric.o
g++ -c -fPIC $CFLAGS_2GEOM ../src/3rdparty/2geom/src/2geom/svg-path-parser.cpp -o src_3rdparty_2geom_src_2geom_svg-path-parser.o
g++ -c -fPIC $CFLAGS_2GEOM ../src/3rdparty/2geom/src/2geom/svg-path-writer.cpp -o src_3rdparty_2geom_src_2geom_svg-path-writer.o
g++ -c -fPIC $CFLAGS_2GEOM ../src/3rdparty/2geom/src/2geom/sweep-bounds.cpp -o src_3rdparty_2geom_src_2geom_sweep-bounds.o
g++ -c -fPIC $CFLAGS_2GEOM ../src/3rdparty/2geom/src/2geom/transforms.cpp -o src_3rdparty_2geom_src_2geom_transforms.o
g++ -c -fPIC $CFLAGS_2GEOM ../src/3rdparty/2geom/src/2geom/utils.cpp -o src_3rdparty_2geom_src_2geom_utils.o
ld -shared -o lib2geom.so \
    src_3rdparty_2geom_src_2geom_affine.o \
    src_3rdparty_2geom_src_2geom_basic-intersection.o \
    src_3rdparty_2geom_src_2geom_bezier.o \
    src_3rdparty_2geom_src_2geom_bezier-clipping.o \
    src_3rdparty_2geom_src_2geom_bezier-curve.o \
    src_3rdparty_2geom_src_2geom_bezier-utils.o \
    src_3rdparty_2geom_src_2geom_cairo-path-sink.o \
    src_3rdparty_2geom_src_2geom_circle.o \
    src_3rdparty_2geom_src_2geom_concepts.o \
    src_3rdparty_2geom_src_2geom_conicsec.o \
    src_3rdparty_2geom_src_2geom_conic_section_clipper_impl.o \
    src_3rdparty_2geom_src_2geom_convex-hull.o \
    src_3rdparty_2geom_src_2geom_coord.o \
    src_3rdparty_2geom_src_2geom_crossing.o \
    src_3rdparty_2geom_src_2geom_curve.o \
    src_3rdparty_2geom_src_2geom_d2-sbasis.o \
    src_3rdparty_2geom_src_2geom_ellipse.o \
    src_3rdparty_2geom_src_2geom_elliptical-arc.o \
    src_3rdparty_2geom_src_2geom_elliptical-arc-from-sbasis.o \
    src_3rdparty_2geom_src_2geom_geom.o \
    src_3rdparty_2geom_src_2geom_intersection-graph.o \
    src_3rdparty_2geom_src_2geom_line.o \
    src_3rdparty_2geom_src_2geom_nearest-time.o \
    src_3rdparty_2geom_src_2geom_numeric_matrix.o \
    src_3rdparty_2geom_src_2geom_parallelogram.o \
    src_3rdparty_2geom_src_2geom_parting-point.o \
    src_3rdparty_2geom_src_2geom_path-extrema.o \
    src_3rdparty_2geom_src_2geom_path-intersection.o \
    src_3rdparty_2geom_src_2geom_path-sink.o \
    src_3rdparty_2geom_src_2geom_path.o \
    src_3rdparty_2geom_src_2geom_pathvector.o \
    src_3rdparty_2geom_src_2geom_piecewise.o \
    src_3rdparty_2geom_src_2geom_point.o \
    src_3rdparty_2geom_src_2geom_polynomial.o \
    src_3rdparty_2geom_src_2geom_rect.o \
    src_3rdparty_2geom_src_2geom_recursive-bezier-intersection.o \
    src_3rdparty_2geom_src_2geom_sbasis-2d.o \
    src_3rdparty_2geom_src_2geom_sbasis-geometric.o \
    src_3rdparty_2geom_src_2geom_sbasis-math.o \
    src_3rdparty_2geom_src_2geom_sbasis-poly.o \
    src_3rdparty_2geom_src_2geom_sbasis-roots.o \
    src_3rdparty_2geom_src_2geom_sbasis-to-bezier.o \
    src_3rdparty_2geom_src_2geom_sbasis.o \
    src_3rdparty_2geom_src_2geom_self-intersect.o \
    src_3rdparty_2geom_src_2geom_solve-bezier.o \
    src_3rdparty_2geom_src_2geom_solve-bezier-one-d.o \
    src_3rdparty_2geom_src_2geom_solve-bezier-parametric.o \
    src_3rdparty_2geom_src_2geom_svg-path-parser.o \
    src_3rdparty_2geom_src_2geom_svg-path-writer.o \
    src_3rdparty_2geom_src_2geom_sweep-bounds.o \
    src_3rdparty_2geom_src_2geom_transforms.o
END_MEASUREMENT



START_MEASUREMENT  'Compiling liblivarot_LIB.a'
CFLAGS_LIVAROT=$CFLAGS
CFLAGS_LIVAROT="$CFLAGS_LIVAROT -I../src/3rdparty/2geom/include/"
CFLAGS_LIVAROT="$CFLAGS_LIVAROT -I../src/"
CFLAGS_LIVAROT="$CFLAGS_LIVAROT $(pkg-config --cflags glib-2.0)"
CFLAGS_LIVAROT="$CFLAGS_LIVAROT $(pkg-config --cflags glibmm-2.68)"
CFLAGS_LIVAROT="$CFLAGS_LIVAROT $(pkg-config --cflags libxml-2.0)"
g++ -c $CFLAGS_LIVAROT ../src/livarot/AVL.cpp -o src_livarot_AVL.o
g++ -c $CFLAGS_LIVAROT ../src/livarot/float-line.cpp -o src_livarot_float-line.o
g++ -c $CFLAGS_LIVAROT ../src/livarot/PathConversion.cpp -o src_livarot_PathConversion.o
g++ -c $CFLAGS_LIVAROT ../src/livarot/Path.cpp -o src_livarot_Path.o
g++ -c $CFLAGS_LIVAROT ../src/livarot/PathCutting.cpp -o src_livarot_PathCutting.o
g++ -c $CFLAGS_LIVAROT ../src/livarot/path-description.cpp -o src_livarot_path-description.o
g++ -c $CFLAGS_LIVAROT ../src/livarot/PathOutline.cpp -o src_livarot_PathOutline.o
g++ -c $CFLAGS_LIVAROT ../src/livarot/PathSimplify.cpp -o src_livarot_PathSimplify.o
g++ -c $CFLAGS_LIVAROT ../src/livarot/PathStroke.cpp -o src_livarot_PathStroke.o
g++ -c $CFLAGS_LIVAROT ../src/livarot/Shape.cpp -o src_livarot_Shape.o
g++ -c $CFLAGS_LIVAROT ../src/livarot/ShapeDraw.cpp -o src_livarot_ShapeDraw.o
g++ -c $CFLAGS_LIVAROT ../src/livarot/ShapeMisc.cpp -o src_livarot_ShapeMisc.o
g++ -c $CFLAGS_LIVAROT ../src/livarot/ShapeRaster.cpp -o src_livarot_ShapeRaster.o
g++ -c $CFLAGS_LIVAROT ../src/livarot/ShapeSweep.cpp -o src_livarot_ShapeSweep.o
g++ -c $CFLAGS_LIVAROT ../src/livarot/sweep-event.cpp -o src_livarot_sweep-event.o
g++ -c $CFLAGS_LIVAROT ../src/livarot/sweep-tree.cpp -o src_livarot_sweep-tree.o
g++ -c $CFLAGS_LIVAROT ../src/livarot/sweep-tree-list.cpp -o src_livarot_sweep-tree-list.o
ar rcs liblivarot_LIB.a \
    src_livarot_AVL.o \
    src_livarot_float-line.o \
    src_livarot_PathConversion.o \
    src_livarot_Path.o \
    src_livarot_PathCutting.o \
    src_livarot_path-description.o \
    src_livarot_PathOutline.o \
    src_livarot_PathSimplify.o \
    src_livarot_PathStroke.o \
    src_livarot_Shape.o \
    src_livarot_ShapeDraw.o \
    src_livarot_ShapeMisc.o \
    src_livarot_ShapeRaster.o \
    src_livarot_ShapeSweep.o \
    src_livarot_sweep-event.o \
    src_livarot_sweep-tree.o \
    src_livarot_sweep-tree-list.o 
END_MEASUREMENT





START_MEASUREMENT  'Compiling libutil_LIB.a'
CFLAGS_UTIL=$CFLAGS
CFLAGS_UTIL="$CFLAGS_UTIL -I../src/"
CFLAGS_UTIL="$CFLAGS_UTIL $(pkg-config --cflags gtkmm-4.0)"
# CFLAGS_UTIL="$CFLAGS_UTIL $(pkg-config --cflags gdk-3.0)"
# CFLAGS_UTIL="$CFLAGS_UTIL $(pkg-config --cflags gtk4)"
CFLAGS_UTIL="$CFLAGS_UTIL $(pkg-config --cflags glibmm-2.68)"
CFLAGS_UTIL="$CFLAGS_UTIL $(pkg-config --cflags atk)"
CFLAGS_UTIL="$CFLAGS_UTIL -I../src/3rdparty/2geom/include/"
CFLAGS_UTIL="$CFLAGS_UTIL $(pkg-config --cflags libxml-2.0)"
g++ -c $CFLAGS_UTIL ../src/util/action-accel.cpp -o src_util_action-accel.o
g++ -c $CFLAGS_UTIL ../src/util/document-fonts.cpp -o src_util_document-fonts.o
g++ -c $CFLAGS_UTIL ../src/util/expression-evaluator.cpp -o src_util_expression-evaluator.o
g++ -c $CFLAGS_UTIL ../src/util/font-collections.cpp -o src_util_font-collections.o
g++ -c $CFLAGS_UTIL ../src/util/format_size.cpp -o src_util_format_size.o
g++ -c $CFLAGS_UTIL ../src/util/font-discovery.cpp -o src_util_font-discovery.o
g++ -c $CFLAGS_UTIL ../src/util/font-tags.cpp -o src_util_font-tags.o
g++ -c $CFLAGS_UTIL ../src/util/funclog.cpp -o src_util_funclog.o
g++ -c $CFLAGS_UTIL ../src/util/share.cpp -o src_util_share.o
g++ -c $CFLAGS_UTIL ../src/util/object-renderer.cpp -o src_util_object-renderer.o
g++ -c $CFLAGS_UTIL ../src/util/paper.cpp -o src_util_paper.o
g++ -c $CFLAGS_UTIL ../src/util/preview.cpp -o src_util_preview.o
g++ -c $CFLAGS_UTIL ../src/util/source_date_epoch.cpp -o src_util_source_date_epoch.o
g++ -c $CFLAGS_UTIL ../src/util/statics.cpp -o src_util_statics.o
g++ -c $CFLAGS_UTIL ../src/util/recently-used-fonts.cpp -o src_util_recently-used-fonts.o
g++ -c $CFLAGS_UTIL ../src/util/pool.cpp -o src_util_pool.o
g++ -c $CFLAGS_UTIL ../src/util/units.cpp -o src_util_units.o
g++ -c $CFLAGS_UTIL ../src/util/ziptool.cpp -o src_util_ziptool.o
ar rcs libutil_LIB.a \
    src_util_action-accel.o \
    src_util_document-fonts.o \
    src_util_expression-evaluator.o \
    src_util_font-collections.o \
    src_util_format_size.o \
    src_util_font-discovery.o \
    src_util_font-tags.o \
    src_util_funclog.o \
    src_util_share.o \
    src_util_object-renderer.o \
    src_util_paper.o \
    src_util_preview.o \
    src_util_source_date_epoch.o \
    src_util_statics.o \
    src_util_recently-used-fonts.o \
    src_util_pool.o \
    src_util_units.o \
    src_util_ziptool.o 
END_MEASUREMENT





START_MEASUREMENT  'Compiling libuemf_LIB.a'
gcc -c ../src/3rdparty/libuemf/symbol_convert.c -o src_3rdparty_libuemf_symbol_convert.o
gcc -c ../src/3rdparty/libuemf/uemf.c -o src_3rdparty_libuemf_uemf.o
gcc -c ../src/3rdparty/libuemf/uemf_endian.c -o src_3rdparty_libuemf_uemf_endian.o
gcc -c ../src/3rdparty/libuemf/uemf_print.c -o src_3rdparty_libuemf_uemf_print.o
gcc -c ../src/3rdparty/libuemf/uemf_safe.c -o src_3rdparty_libuemf_uemf_safe.o
gcc -c ../src/3rdparty/libuemf/uemf_utf.c -o src_3rdparty_libuemf_uemf_utf.o
gcc -c ../src/3rdparty/libuemf/uwmf.c -o src_3rdparty_libuemf_uwmf.o
gcc -c ../src/3rdparty/libuemf/uwmf_endian.c -o src_3rdparty_libuemf_uwmf_endian.o
gcc -c ../src/3rdparty/libuemf/uwmf_print.c -o src_3rdparty_libuemf_uwmf_print.o
gcc -c ../src/3rdparty/libuemf/upmf.c -o src_3rdparty_libuemf_upmf.o
gcc -c ../src/3rdparty/libuemf/upmf_print.c -o src_3rdparty_libuemf_upmf_print.o
ar rcs libuemf_LIB.a \
    src_3rdparty_libuemf_symbol_convert.o \
    src_3rdparty_libuemf_uemf.o \
    src_3rdparty_libuemf_uemf_endian.o \
    src_3rdparty_libuemf_uemf_print.o \
    src_3rdparty_libuemf_uemf_safe.o \
    src_3rdparty_libuemf_uemf_utf.o \
    src_3rdparty_libuemf_uwmf.o \
    src_3rdparty_libuemf_uwmf_endian.o \
    src_3rdparty_libuemf_uwmf_print.o \
    src_3rdparty_libuemf_upmf.o \
    src_3rdparty_libuemf_upmf_print.o 
END_MEASUREMENT




START_MEASUREMENT  'Compiling libcroco_LIB.a'
CFLAGS_CROCO=-Wno-unused-result
CFLAGS_CROCO="$CFLAGS_CROCO $(pkg-config --cflags glib-2.0)"
CFLAGS_CROCO="$CFLAGS_CROCO $(pkg-config --cflags libxml-2.0)"
gcc -c $CFLAGS_CROCO ../src/3rdparty/libcroco/src/cr-additional-sel.c -o src_3rdparty_libcroco_src_cr-additional-sel.o
gcc -c $CFLAGS_CROCO ../src/3rdparty/libcroco/src/cr-attr-sel.c -o src_3rdparty_libcroco_src_cr-attr-sel.o
gcc -c $CFLAGS_CROCO ../src/3rdparty/libcroco/src/cr-cascade.c -o src_3rdparty_libcroco_src_cr-cascade.o
gcc -c $CFLAGS_CROCO ../src/3rdparty/libcroco/src/cr-declaration.c -o src_3rdparty_libcroco_src_cr-declaration.o
gcc -c $CFLAGS_CROCO ../src/3rdparty/libcroco/src/cr-doc-handler.c -o src_3rdparty_libcroco_src_cr-doc-handler.o
gcc -c $CFLAGS_CROCO ../src/3rdparty/libcroco/src/cr-enc-handler.c -o src_3rdparty_libcroco_src_cr-enc-handler.o
gcc -c $CFLAGS_CROCO ../src/3rdparty/libcroco/src/cr-fonts.c -o src_3rdparty_libcroco_src_cr-fonts.o
gcc -c $CFLAGS_CROCO ../src/3rdparty/libcroco/src/cr-input.c -o src_3rdparty_libcroco_src_cr-input.o
gcc -c $CFLAGS_CROCO ../src/3rdparty/libcroco/src/cr-libxml-node-iface.c -o src_3rdparty_libcroco_src_cr-libxml-node-iface.o
gcc -c $CFLAGS_CROCO ../src/3rdparty/libcroco/src/cr-num.c -o src_3rdparty_libcroco_src_cr-num.o
gcc -c $CFLAGS_CROCO ../src/3rdparty/libcroco/src/cr-om-parser.c -o src_3rdparty_libcroco_src_cr-om-parser.o
gcc -c $CFLAGS_CROCO ../src/3rdparty/libcroco/src/cr-parser.c -o src_3rdparty_libcroco_src_cr-parser.o
gcc -c $CFLAGS_CROCO ../src/3rdparty/libcroco/src/cr-parsing-location.c -o src_3rdparty_libcroco_src_cr-parsing-location.o
gcc -c $CFLAGS_CROCO ../src/3rdparty/libcroco/src/cr-prop-list.c -o src_3rdparty_libcroco_src_cr-prop-list.o
gcc -c $CFLAGS_CROCO ../src/3rdparty/libcroco/src/cr-pseudo.c -o src_3rdparty_libcroco_src_cr-pseudo.o
gcc -c $CFLAGS_CROCO ../src/3rdparty/libcroco/src/cr-rgb.c -o src_3rdparty_libcroco_src_cr-rgb.o
gcc -c $CFLAGS_CROCO ../src/3rdparty/libcroco/src/cr-selector.c -o src_3rdparty_libcroco_src_cr-selector.o
gcc -c $CFLAGS_CROCO ../src/3rdparty/libcroco/src/cr-sel-eng.c -o src_3rdparty_libcroco_src_cr-sel-eng.o
gcc -c $CFLAGS_CROCO ../src/3rdparty/libcroco/src/cr-simple-sel.c -o src_3rdparty_libcroco_src_cr-simple-sel.o
gcc -c $CFLAGS_CROCO ../src/3rdparty/libcroco/src/cr-statement.c -o src_3rdparty_libcroco_src_cr-statement.o
gcc -c $CFLAGS_CROCO ../src/3rdparty/libcroco/src/cr-string.c -o src_3rdparty_libcroco_src_cr-string.o
gcc -c $CFLAGS_CROCO ../src/3rdparty/libcroco/src/cr-style.c -o src_3rdparty_libcroco_src_cr-style.o
gcc -c $CFLAGS_CROCO ../src/3rdparty/libcroco/src/cr-stylesheet.c -o src_3rdparty_libcroco_src_cr-stylesheet.o
gcc -c $CFLAGS_CROCO ../src/3rdparty/libcroco/src/cr-term.c -o src_3rdparty_libcroco_src_cr-term.o
gcc -c $CFLAGS_CROCO ../src/3rdparty/libcroco/src/cr-tknzr.c -o src_3rdparty_libcroco_src_cr-tknzr.o
gcc -c $CFLAGS_CROCO ../src/3rdparty/libcroco/src/cr-token.c -o src_3rdparty_libcroco_src_cr-token.o
gcc -c $CFLAGS_CROCO ../src/3rdparty/libcroco/src/cr-utils.c -o src_3rdparty_libcroco_src_cr-utils.o
ar rcs libcroco_LIB.a \
    src_3rdparty_libcroco_src_cr-additional-sel.o \
    src_3rdparty_libcroco_src_cr-attr-sel.o \
    src_3rdparty_libcroco_src_cr-cascade.o \
    src_3rdparty_libcroco_src_cr-declaration.o \
    src_3rdparty_libcroco_src_cr-doc-handler.o \
    src_3rdparty_libcroco_src_cr-enc-handler.o \
    src_3rdparty_libcroco_src_cr-fonts.o \
    src_3rdparty_libcroco_src_cr-input.o \
    src_3rdparty_libcroco_src_cr-libxml-node-iface.o \
    src_3rdparty_libcroco_src_cr-num.o \
    src_3rdparty_libcroco_src_cr-om-parser.o \
    src_3rdparty_libcroco_src_cr-parser.o \
    src_3rdparty_libcroco_src_cr-parsing-location.o \
    src_3rdparty_libcroco_src_cr-prop-list.o \
    src_3rdparty_libcroco_src_cr-pseudo.o \
    src_3rdparty_libcroco_src_cr-rgb.o \
    src_3rdparty_libcroco_src_cr-selector.o \
    src_3rdparty_libcroco_src_cr-sel-eng.o \
    src_3rdparty_libcroco_src_cr-simple-sel.o \
    src_3rdparty_libcroco_src_cr-statement.o \
    src_3rdparty_libcroco_src_cr-string.o \
    src_3rdparty_libcroco_src_cr-style.o \
    src_3rdparty_libcroco_src_cr-stylesheet.o \
    src_3rdparty_libcroco_src_cr-term.o \
    src_3rdparty_libcroco_src_cr-tknzr.o \
    src_3rdparty_libcroco_src_cr-token.o \
    src_3rdparty_libcroco_src_cr-utils.o
END_MEASUREMENT


START_MEASUREMENT  'Compiling libdepixelize_LIB.a'
CFLAGS_TRACER="$CFLAGS"
CFLAGS_TRACER="$CFLAGS_TRACER $(pkg-config --cflags glibmm-2.68)"
CFLAGS_TRACER="$CFLAGS_TRACER $(pkg-config --cflags gtkmm-4.0)"
CFLAGS_TRACER="$CFLAGS_TRACER -I../src/3rdparty/2geom/include/"
g++ -c $CFLAGS_TRACER ../src/3rdparty/libdepixelize/kopftracer2011.cpp -o src_3rdparty_libdepixelize_kopftracer2011.o
ar rcs libdepixelize_LIB.a  src_3rdparty_libdepixelize_kopftracer2011.o
END_MEASUREMENT


START_MEASUREMENT  'Compiling libavoid_LIB.a'
CFLAGS_AVOID="$CFLAGS_AVOID -I../src/3rdparty/adaptagrams"
g++ -c $CFLAGS_AVOID ../src/3rdparty/adaptagrams/libavoid/actioninfo.cpp -o src_3rdparty_adaptagrams_libavoid_actioninfo.o
g++ -c $CFLAGS_AVOID ../src/3rdparty/adaptagrams/libavoid/connectionpin.cpp -o src_3rdparty_adaptagrams_libavoid_connectionpin.o
g++ -c $CFLAGS_AVOID ../src/3rdparty/adaptagrams/libavoid/connector.cpp -o src_3rdparty_adaptagrams_libavoid_connector.o
g++ -c $CFLAGS_AVOID ../src/3rdparty/adaptagrams/libavoid/connend.cpp -o src_3rdparty_adaptagrams_libavoid_connend.o
g++ -c $CFLAGS_AVOID ../src/3rdparty/adaptagrams/libavoid/geometry.cpp -o src_3rdparty_adaptagrams_libavoid_geometry.o
g++ -c $CFLAGS_AVOID ../src/3rdparty/adaptagrams/libavoid/geomtypes.cpp -o src_3rdparty_adaptagrams_libavoid_geomtypes.o
g++ -c $CFLAGS_AVOID ../src/3rdparty/adaptagrams/libavoid/graph.cpp -o src_3rdparty_adaptagrams_libavoid_graph.o
g++ -c $CFLAGS_AVOID ../src/3rdparty/adaptagrams/libavoid/hyperedge.cpp -o src_3rdparty_adaptagrams_libavoid_hyperedge.o
g++ -c $CFLAGS_AVOID ../src/3rdparty/adaptagrams/libavoid/hyperedgeimprover.cpp -o src_3rdparty_adaptagrams_libavoid_hyperedgeimprover.o
g++ -c $CFLAGS_AVOID ../src/3rdparty/adaptagrams/libavoid/hyperedgetree.cpp -o src_3rdparty_adaptagrams_libavoid_hyperedgetree.o
g++ -c $CFLAGS_AVOID ../src/3rdparty/adaptagrams/libavoid/junction.cpp -o src_3rdparty_adaptagrams_libavoid_junction.o
g++ -c $CFLAGS_AVOID ../src/3rdparty/adaptagrams/libavoid/makepath.cpp -o src_3rdparty_adaptagrams_libavoid_makepath.o
g++ -c $CFLAGS_AVOID ../src/3rdparty/adaptagrams/libavoid/mtst.cpp -o src_3rdparty_adaptagrams_libavoid_mtst.o
g++ -c $CFLAGS_AVOID ../src/3rdparty/adaptagrams/libavoid/obstacle.cpp -o src_3rdparty_adaptagrams_libavoid_obstacle.o
g++ -c $CFLAGS_AVOID ../src/3rdparty/adaptagrams/libavoid/orthogonal.cpp -o src_3rdparty_adaptagrams_libavoid_orthogonal.o
g++ -c $CFLAGS_AVOID ../src/3rdparty/adaptagrams/libavoid/router.cpp -o src_3rdparty_adaptagrams_libavoid_router.o
g++ -c $CFLAGS_AVOID ../src/3rdparty/adaptagrams/libavoid/scanline.cpp -o src_3rdparty_adaptagrams_libavoid_scanline.o
g++ -c $CFLAGS_AVOID ../src/3rdparty/adaptagrams/libavoid/shape.cpp -o src_3rdparty_adaptagrams_libavoid_shape.o
g++ -c $CFLAGS_AVOID ../src/3rdparty/adaptagrams/libavoid/timer.cpp -o src_3rdparty_adaptagrams_libavoid_timer.o
g++ -c $CFLAGS_AVOID ../src/3rdparty/adaptagrams/libavoid/vertices.cpp -o src_3rdparty_adaptagrams_libavoid_vertices.o
g++ -c $CFLAGS_AVOID ../src/3rdparty/adaptagrams/libavoid/viscluster.cpp -o src_3rdparty_adaptagrams_libavoid_viscluster.o
g++ -c $CFLAGS_AVOID ../src/3rdparty/adaptagrams/libavoid/visibility.cpp -o src_3rdparty_adaptagrams_libavoid_visibility.o
g++ -c $CFLAGS_AVOID ../src/3rdparty/adaptagrams/libavoid/vpsc.cpp -o src_3rdparty_adaptagrams_libavoid_vpsc.o
ar rcs libavoid_LIB.a \
    src_3rdparty_adaptagrams_libavoid_actioninfo.o \
    src_3rdparty_adaptagrams_libavoid_connectionpin.o \
    src_3rdparty_adaptagrams_libavoid_connector.o \
    src_3rdparty_adaptagrams_libavoid_connend.o \
    src_3rdparty_adaptagrams_libavoid_geometry.o \
    src_3rdparty_adaptagrams_libavoid_geomtypes.o \
    src_3rdparty_adaptagrams_libavoid_graph.o \
    src_3rdparty_adaptagrams_libavoid_hyperedge.o \
    src_3rdparty_adaptagrams_libavoid_hyperedgeimprover.o \
    src_3rdparty_adaptagrams_libavoid_hyperedgetree.o \
    src_3rdparty_adaptagrams_libavoid_junction.o \
    src_3rdparty_adaptagrams_libavoid_makepath.o \
    src_3rdparty_adaptagrams_libavoid_mtst.o \
    src_3rdparty_adaptagrams_libavoid_obstacle.o \
    src_3rdparty_adaptagrams_libavoid_orthogonal.o \
    src_3rdparty_adaptagrams_libavoid_router.o \
    src_3rdparty_adaptagrams_libavoid_scanline.o \
    src_3rdparty_adaptagrams_libavoid_shape.o \
    src_3rdparty_adaptagrams_libavoid_timer.o \
    src_3rdparty_adaptagrams_libavoid_vertices.o \
    src_3rdparty_adaptagrams_libavoid_viscluster.o \
    src_3rdparty_adaptagrams_libavoid_visibility.o \
    src_3rdparty_adaptagrams_libavoid_vpsc.o 
END_MEASUREMENT



START_MEASUREMENT  'Compiling libcola_LIB.a'
CFLAGS_COLA="$CFLAGS_COLA -I../src/3rdparty/adaptagrams"
g++ -c $CFLAGS_COLA ../src/3rdparty/adaptagrams/libcola/box.cpp -o src_3rdparty_adaptagrams_libcola_box.o
g++ -c $CFLAGS_COLA ../src/3rdparty/adaptagrams/libcola/cluster.cpp -o src_3rdparty_adaptagrams_libcola_cluster.o
g++ -c $CFLAGS_COLA ../src/3rdparty/adaptagrams/libcola/cola.cpp -o src_3rdparty_adaptagrams_libcola_cola.o
g++ -c $CFLAGS_COLA ../src/3rdparty/adaptagrams/libcola/convex_hull.cpp -o src_3rdparty_adaptagrams_libcola_convex_hull.o
g++ -c $CFLAGS_COLA ../src/3rdparty/adaptagrams/libcola/compound_constraints.cpp -o src_3rdparty_adaptagrams_libcola_compound_constraints.o
g++ -c $CFLAGS_COLA ../src/3rdparty/adaptagrams/libcola/conjugate_gradient.cpp -o src_3rdparty_adaptagrams_libcola_conjugate_gradient.o
g++ -c $CFLAGS_COLA ../src/3rdparty/adaptagrams/libcola/connected_components.cpp -o src_3rdparty_adaptagrams_libcola_connected_components.o
g++ -c $CFLAGS_COLA ../src/3rdparty/adaptagrams/libcola/gradient_projection.cpp -o src_3rdparty_adaptagrams_libcola_gradient_projection.o
g++ -c $CFLAGS_COLA ../src/3rdparty/adaptagrams/libcola/shapepair.cpp -o src_3rdparty_adaptagrams_libcola_shapepair.o
g++ -c $CFLAGS_COLA ../src/3rdparty/adaptagrams/libcola/straightener.cpp -o src_3rdparty_adaptagrams_libcola_straightener.o
ar rcs libcola_LIB.a \
    src_3rdparty_adaptagrams_libcola_box.o \
    src_3rdparty_adaptagrams_libcola_cluster.o \
    src_3rdparty_adaptagrams_libcola_cola.o \
    src_3rdparty_adaptagrams_libcola_convex_hull.o \
    src_3rdparty_adaptagrams_libcola_compound_constraints.o \
    src_3rdparty_adaptagrams_libcola_conjugate_gradient.o \
    src_3rdparty_adaptagrams_libcola_connected_components.o \
    src_3rdparty_adaptagrams_libcola_gradient_projection.o \
    src_3rdparty_adaptagrams_libcola_shapepair.o \
    src_3rdparty_adaptagrams_libcola_straightener.o 
END_MEASUREMENT





START_MEASUREMENT  'Compiling libvpsc_LIB.a'
CFLAGS_VPSC="$CFLAGS_VPSC -I../src/3rdparty/adaptagrams"
g++ -c $CFLAGS_VPSC ../src/3rdparty/adaptagrams/libvpsc/block.cpp -o src_3rdparty_adaptagrams_libvpsc_block.o
g++ -c $CFLAGS_VPSC ../src/3rdparty/adaptagrams/libvpsc/blocks.cpp -o src_3rdparty_adaptagrams_libvpsc_blocks.o
g++ -c $CFLAGS_VPSC ../src/3rdparty/adaptagrams/libvpsc/cbuffer.cpp -o src_3rdparty_adaptagrams_libvpsc_cbuffer.o
g++ -c $CFLAGS_VPSC ../src/3rdparty/adaptagrams/libvpsc/constraint.cpp -o src_3rdparty_adaptagrams_libvpsc_constraint.o
g++ -c $CFLAGS_VPSC ../src/3rdparty/adaptagrams/libvpsc/rectangle.cpp -o src_3rdparty_adaptagrams_libvpsc_rectangle.o
g++ -c $CFLAGS_VPSC ../src/3rdparty/adaptagrams/libvpsc/solve_VPSC.cpp -o src_3rdparty_adaptagrams_libvpsc_solve_VPSC.o
g++ -c $CFLAGS_VPSC ../src/3rdparty/adaptagrams/libvpsc/variable.cpp -o src_3rdparty_adaptagrams_libvpsc_variable.o
ar rcs libvpsc_LIB.a \
    src_3rdparty_adaptagrams_libvpsc_block.o \
    src_3rdparty_adaptagrams_libvpsc_blocks.o \
    src_3rdparty_adaptagrams_libvpsc_cbuffer.o \
    src_3rdparty_adaptagrams_libvpsc_constraint.o \
    src_3rdparty_adaptagrams_libvpsc_rectangle.o \
    src_3rdparty_adaptagrams_libvpsc_solve_VPSC.o \
    src_3rdparty_adaptagrams_libvpsc_variable.o 
END_MEASUREMENT




START_MEASUREMENT  'Compiling libautotrace_LIB.a'
CFLAGS_AUTOTRACE="$CFLAGS_AUTOTRACE -DHAVE_CONFIG_H"
CFLAGS_AUTOTRACE="$CFLAGS_AUTOTRACE $(pkg-config --cflags glib-2.0)"
gcc -c $CFLAGS_AUTOTRACE ../src/3rdparty/autotrace/autotrace.c -o src_3rdparty_autotrace_autotrace.o
gcc -c $CFLAGS_AUTOTRACE ../src/3rdparty/autotrace/bitmap.c -o src_3rdparty_autotrace_bitmap.o
gcc -c $CFLAGS_AUTOTRACE ../src/3rdparty/autotrace/color.c -o src_3rdparty_autotrace_color.o
gcc -c $CFLAGS_AUTOTRACE ../src/3rdparty/autotrace/curve.c -o src_3rdparty_autotrace_curve.o
gcc -c $CFLAGS_AUTOTRACE ../src/3rdparty/autotrace/despeckle.c -o src_3rdparty_autotrace_despeckle.o
gcc -c $CFLAGS_AUTOTRACE ../src/3rdparty/autotrace/epsilon-equal.c -o src_3rdparty_autotrace_epsilon-equal.o
gcc -c $CFLAGS_AUTOTRACE ../src/3rdparty/autotrace/exception.c -o src_3rdparty_autotrace_exception.o
gcc -c $CFLAGS_AUTOTRACE ../src/3rdparty/autotrace/filename.c -o src_3rdparty_autotrace_filename.o
gcc -c $CFLAGS_AUTOTRACE ../src/3rdparty/autotrace/fit.c -o src_3rdparty_autotrace_fit.o
gcc -c $CFLAGS_AUTOTRACE ../src/3rdparty/autotrace/image-proc.c -o src_3rdparty_autotrace_image-proc.o
gcc -c $CFLAGS_AUTOTRACE ../src/3rdparty/autotrace/input.c -o src_3rdparty_autotrace_input.o
gcc -c $CFLAGS_AUTOTRACE ../src/3rdparty/autotrace/logreport.c -o src_3rdparty_autotrace_logreport.o
gcc -c $CFLAGS_AUTOTRACE ../src/3rdparty/autotrace/median.c -o src_3rdparty_autotrace_median.o
gcc -c $CFLAGS_AUTOTRACE ../src/3rdparty/autotrace/module.c -o src_3rdparty_autotrace_module.o
gcc -c $CFLAGS_AUTOTRACE ../src/3rdparty/autotrace/output.c -o src_3rdparty_autotrace_output.o
gcc -c $CFLAGS_AUTOTRACE ../src/3rdparty/autotrace/pxl-outline.c -o src_3rdparty_autotrace_pxl-outline.o
gcc -c $CFLAGS_AUTOTRACE ../src/3rdparty/autotrace/spline.c -o src_3rdparty_autotrace_spline.o
gcc -c $CFLAGS_AUTOTRACE ../src/3rdparty/autotrace/thin-image.c -o src_3rdparty_autotrace_thin-image.o
gcc -c $CFLAGS_AUTOTRACE ../src/3rdparty/autotrace/vector.c -o src_3rdparty_autotrace_vector.o
ar rcs libautotrace_LIB.a \
    src_3rdparty_autotrace_autotrace.o \
    src_3rdparty_autotrace_bitmap.o \
    src_3rdparty_autotrace_color.o \
    src_3rdparty_autotrace_curve.o \
    src_3rdparty_autotrace_despeckle.o \
    src_3rdparty_autotrace_epsilon-equal.o \
    src_3rdparty_autotrace_exception.o \
    src_3rdparty_autotrace_filename.o \
    src_3rdparty_autotrace_fit.o \
    src_3rdparty_autotrace_image-proc.o \
    src_3rdparty_autotrace_input.o \
    src_3rdparty_autotrace_logreport.o \
    src_3rdparty_autotrace_median.o \
    src_3rdparty_autotrace_module.o \
    src_3rdparty_autotrace_output.o \
    src_3rdparty_autotrace_pxl-outline.o \
    src_3rdparty_autotrace_spline.o \
    src_3rdparty_autotrace_thin-image.o \
    src_3rdparty_autotrace_vector.o 
END_MEASUREMENT




START_MEASUREMENT 'Compiling libgc_LIB.a'
CFLAGS_INKGC="$CFLAGS -I../src/"
CFLAGS_INKGC="$CFLAGS_INKGC $(pkg-config --cflags glibmm-2.68)"
g++ -c $CFLAGS_INKGC ../src/inkgc/gc.cpp -o src_inkgc_gc.o
ar rcs libgc_LIB.a src_inkgc_gc.o
END_MEASUREMENT 



START_MEASUREMENT  'compiling libinkscape_base.so'
CFLAGS_INKSCAPE="$CFLAGS"
CFLAGS_INKSCAPE="$CFLAGS_INKSCAPE -DHAVE_POPPLER"
CFLAGS_INKSCAPE="$CFLAGS_INKSCAPE -DHAVE_CONFIG_H"
CFLAGS_INKSCAPE="$CFLAGS_INKSCAPE -I../src/"
CFLAGS_INKSCAPE="$CFLAGS_INKSCAPE -I../src/3rdparty/2geom/include/"
CFLAGS_INKSCAPE="$CFLAGS_INKSCAPE -I../src/3rdparty/2geom/include/2geom"
CFLAGS_INKSCAPE="$CFLAGS_INKSCAPE -I../src/3rdparty/adaptagrams"
CFLAGS_INKSCAPE="$CFLAGS_INKSCAPE -I../__generated"
CFLAGS_INKSCAPE="$CFLAGS_INKSCAPE $(pkg-config --cflags glib-2.0)"
CFLAGS_INKSCAPE="$CFLAGS_INKSCAPE $(pkg-config --cflags glibmm-2.68)"
CFLAGS_INKSCAPE="$CFLAGS_INKSCAPE $(pkg-config --cflags cairomm-1.16)"
CFLAGS_INKSCAPE="$CFLAGS_INKSCAPE $(pkg-config --cflags giomm-2.68)"
CFLAGS_INKSCAPE="$CFLAGS_INKSCAPE $(pkg-config --cflags libxml-2.0)"
CFLAGS_INKSCAPE="$CFLAGS_INKSCAPE $(pkg-config --cflags gdk-pixbuf-2.0)"
CFLAGS_INKSCAPE="$CFLAGS_INKSCAPE $(pkg-config --cflags pangomm-2.48)"
CFLAGS_INKSCAPE="$CFLAGS_INKSCAPE $(pkg-config --cflags gtk4)"
CFLAGS_INKSCAPE="$CFLAGS_INKSCAPE $(pkg-config --cflags gtkmm-4.0)"
CFLAGS_INKSCAPE="$CFLAGS_INKSCAPE $(pkg-config --cflags poppler)"
CFLAGS_INKSCAPE="$CFLAGS_INKSCAPE $(pkg-config --cflags libcdr-0.1)"
CFLAGS_INKSCAPE="$CFLAGS_INKSCAPE $(pkg-config --cflags libvisio-0.1)"
CFLAGS_INKSCAPE="$CFLAGS_INKSCAPE $(pkg-config --cflags libwpg-0.3)"
CFLAGS_INKSCAPE="$CFLAGS_INKSCAPE $(pkg-config --cflags GraphicsMagick++)"
CFLAGS_INKSCAPE="$CFLAGS_INKSCAPE $(pkg-config --cflags gtksourceview-4)"
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/async/async.cpp -o _src_async_async.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/colors/cms/profile.cpp -o _src_colors_cms_profile.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/colors/cms/system.cpp -o _src_colors_cms_system.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/colors/cms/transform.cpp -o _src_colors_cms_transform.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/colors/color.cpp -o _src_colors_color.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/colors/document-cms.cpp -o _src_colors_document-cms.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/colors/dragndrop.cpp -o _src_colors_dragndrop.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/colors/manager.cpp -o _src_colors_manager.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/colors/parser.cpp -o _src_colors_parser.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/colors/printer.cpp -o _src_colors_printer.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/colors/color-set.cpp -o _src_colors_color-set.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/colors/spaces/base.cpp -o _src_colors_spaces_base.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/colors/spaces/cms.cpp -o _src_colors_spaces_cms.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/colors/spaces/cmyk.cpp -o _src_colors_spaces_cmyk.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/colors/spaces/components.cpp -o _src_colors_spaces_components.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/colors/spaces/gray.cpp -o _src_colors_spaces_gray.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/colors/spaces/hsl.cpp -o _src_colors_spaces_hsl.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/colors/spaces/hsluv.cpp -o _src_colors_spaces_hsluv.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/colors/spaces/hsv.cpp -o _src_colors_spaces_hsv.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/colors/spaces/lab.cpp -o _src_colors_spaces_lab.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/colors/spaces/lch.cpp -o _src_colors_spaces_lch.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/colors/spaces/linear-rgb.cpp -o _src_colors_spaces_linear-rgb.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/colors/spaces/luv.cpp -o _src_colors_spaces_luv.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/colors/spaces/okhsl.cpp -o _src_colors_spaces_okhsl.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/colors/spaces/oklab.cpp -o _src_colors_spaces_oklab.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/colors/spaces/oklch.cpp -o _src_colors_spaces_oklch.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/colors/spaces/named.cpp -o _src_colors_spaces_named.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/colors/spaces/rgb.cpp -o _src_colors_spaces_rgb.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/colors/spaces/xyz.cpp -o _src_colors_spaces_xyz.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/colors/utils.cpp -o _src_colors_utils.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/colors/xml-color.cpp -o _src_colors_xml-color.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/debug/demangle.cpp -o _src_debug_demangle.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/debug/heap.cpp -o _src_debug_heap.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/debug/logger.cpp -o _src_debug_logger.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/debug/sysv-heap.cpp -o _src_debug_sysv-heap.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/debug/timestamp.cpp -o _src_debug_timestamp.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/display/cairo-utils.cpp -o _src_display_cairo-utils.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/display/curve.cpp -o _src_display_curve.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/display/drawing-context.cpp -o _src_display_drawing-context.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/display/drawing-group.cpp -o _src_display_drawing-group.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/display/drawing-image.cpp -o _src_display_drawing-image.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/display/drawing-item.cpp -o _src_display_drawing-item.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/display/drawing-paintserver.cpp -o _src_display_drawing-paintserver.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/display/drawing-pattern.cpp -o _src_display_drawing-pattern.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/display/drawing-shape.cpp -o _src_display_drawing-shape.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/display/drawing-surface.cpp -o _src_display_drawing-surface.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/display/drawing-text.cpp -o _src_display_drawing-text.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/display/drawing.cpp -o _src_display_drawing.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/display/nr-3dutils.cpp -o _src_display_nr-3dutils.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/display/nr-filter-blend.cpp -o _src_display_nr-filter-blend.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/display/nr-filter-colormatrix.cpp -o _src_display_nr-filter-colormatrix.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/display/nr-filter-component-transfer.cpp -o _src_display_nr-filter-component-transfer.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/display/nr-filter-composite.cpp -o _src_display_nr-filter-composite.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/display/nr-filter-convolve-matrix.cpp -o _src_display_nr-filter-convolve-matrix.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/display/nr-filter-diffuselighting.cpp -o _src_display_nr-filter-diffuselighting.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/display/nr-filter-displacement-map.cpp -o _src_display_nr-filter-displacement-map.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/display/nr-filter-flood.cpp -o _src_display_nr-filter-flood.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/display/nr-filter-gaussian.cpp -o _src_display_nr-filter-gaussian.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/display/nr-filter-image.cpp -o _src_display_nr-filter-image.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/display/nr-filter-merge.cpp -o _src_display_nr-filter-merge.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/display/nr-filter-morphology.cpp -o _src_display_nr-filter-morphology.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/display/nr-filter-offset.cpp -o _src_display_nr-filter-offset.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/display/nr-filter-primitive.cpp -o _src_display_nr-filter-primitive.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/display/nr-filter-slot.cpp -o _src_display_nr-filter-slot.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/display/nr-filter-specularlighting.cpp -o _src_display_nr-filter-specularlighting.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/display/nr-filter-tile.cpp -o _src_display_nr-filter-tile.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/display/nr-filter-turbulence.cpp -o _src_display_nr-filter-turbulence.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/display/nr-filter-units.cpp -o _src_display_nr-filter-units.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/display/nr-filter.cpp -o _src_display_nr-filter.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/display/nr-light.cpp -o _src_display_nr-light.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/display/nr-style.cpp -o _src_display_nr-style.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/display/nr-svgfonts.cpp -o _src_display_nr-svgfonts.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/display/translucency-group.cpp -o _src_display_translucency-group.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/display/control/canvas-temporary-item-list.cpp -o _src_display_control_canvas-temporary-item-list.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/display/control/canvas-temporary-item.cpp -o _src_display_control_canvas-temporary-item.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/display/control/ctrl-handle-manager.cpp -o _src_display_control_ctrl-handle-manager.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/display/control/ctrl-handle-rendering.cpp -o _src_display_control_ctrl-handle-rendering.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/display/control/ctrl-handle-styling.cpp -o _src_display_control_ctrl-handle-styling.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/display/control/snap-indicator.cpp -o _src_display_control_snap-indicator.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/display/control/canvas-item.cpp -o _src_display_control_canvas-item.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/display/control/canvas-item-bpath.cpp -o _src_display_control_canvas-item-bpath.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/display/control/canvas-item-catchall.cpp -o _src_display_control_canvas-item-catchall.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/display/control/canvas-item-context.cpp -o _src_display_control_canvas-item-context.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/display/control/canvas-item-ctrl.cpp -o _src_display_control_canvas-item-ctrl.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/display/control/canvas-item-curve.cpp -o _src_display_control_canvas-item-curve.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/display/control/canvas-item-drawing.cpp -o _src_display_control_canvas-item-drawing.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/display/control/canvas-item-grid.cpp -o _src_display_control_canvas-item-grid.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/display/control/canvas-item-group.cpp -o _src_display_control_canvas-item-group.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/display/control/canvas-item-guideline.cpp -o _src_display_control_canvas-item-guideline.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/display/control/canvas-item-quad.cpp -o _src_display_control_canvas-item-quad.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/display/control/canvas-item-rect.cpp -o _src_display_control_canvas-item-rect.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/display/control/canvas-item-text.cpp -o _src_display_control_canvas-item-text.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/display/control/canvas-page.cpp -o _src_display_control_canvas-page.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/db.cpp -o _src_extension_db.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/dependency.cpp -o _src_extension_dependency.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/processing-action.cpp -o _src_extension_processing-action.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/effect.cpp -o _src_extension_effect.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/execution-env.cpp -o _src_extension_execution-env.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/extension.cpp -o _src_extension_extension.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/init.cpp -o _src_extension_init.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/input.cpp -o _src_extension_input.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/output.cpp -o _src_extension_output.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/patheffect.cpp -o _src_extension_patheffect.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/print.cpp -o _src_extension_print.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/system.cpp -o _src_extension_system.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/template.cpp -o _src_extension_template.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/timer.cpp -o _src_extension_timer.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/loader.cpp -o _src_extension_loader.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/implementation/implementation.cpp -o _src_extension_implementation_implementation.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/implementation/xslt.cpp -o _src_extension_implementation_xslt.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/implementation/script.cpp -o _src_extension_implementation_script.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/bluredge.cpp -o _src_extension_internal_bluredge.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/cairo-ps-out.cpp -o _src_extension_internal_cairo-ps-out.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/cairo-render-context.cpp -o _src_extension_internal_cairo-render-context.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/cairo-renderer.cpp -o _src_extension_internal_cairo-renderer.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/cairo-renderer-pdf-out.cpp -o _src_extension_internal_cairo-renderer-pdf-out.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/emf-inout.cpp -o _src_extension_internal_emf-inout.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/emf-print.cpp -o _src_extension_internal_emf-print.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/gdkpixbuf-input.cpp -o _src_extension_internal_gdkpixbuf-input.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/gimpgrad.cpp -o _src_extension_internal_gimpgrad.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/grid.cpp -o _src_extension_internal_grid.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/image-resolution.cpp -o _src_extension_internal_image-resolution.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/latex-pstricks.cpp -o _src_extension_internal_latex-pstricks.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/latex-pstricks-out.cpp -o _src_extension_internal_latex-pstricks-out.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/metafile-inout.cpp -o _src_extension_internal_metafile-inout.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/metafile-print.cpp -o _src_extension_internal_metafile-print.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/odf.cpp -o _src_extension_internal_odf.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/latex-text-renderer.cpp -o _src_extension_internal_latex-text-renderer.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/png-output.cpp -o _src_extension_internal_png-output.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/pov-out.cpp -o _src_extension_internal_pov-out.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/svg.cpp -o _src_extension_internal_svg.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/svgz.cpp -o _src_extension_internal_svgz.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/template-base.cpp -o _src_extension_internal_template-base.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/template-from-file.cpp -o _src_extension_internal_template-from-file.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/template-other.cpp -o _src_extension_internal_template-other.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/template-paper.cpp -o _src_extension_internal_template-paper.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/template-screen.cpp -o _src_extension_internal_template-screen.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/template-social.cpp -o _src_extension_internal_template-social.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/template-video.cpp -o _src_extension_internal_template-video.o
gcc -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/text_reassemble.c -o _src_extension_internal_text_reassemble.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/wmf-inout.cpp -o _src_extension_internal_wmf-inout.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/wmf-print.cpp -o _src_extension_internal_wmf-print.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/filter/filter-all.cpp -o _src_extension_internal_filter_filter-all.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/filter/filter-file.cpp -o _src_extension_internal_filter_filter-file.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/filter/filter.cpp -o _src_extension_internal_filter_filter.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/prefdialog/prefdialog.cpp -o _src_extension_prefdialog_prefdialog.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/prefdialog/parameter.cpp -o _src_extension_prefdialog_parameter.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/prefdialog/parameter-bool.cpp -o _src_extension_prefdialog_parameter-bool.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/prefdialog/parameter-color.cpp -o _src_extension_prefdialog_parameter-color.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/prefdialog/parameter-float.cpp -o _src_extension_prefdialog_parameter-float.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/prefdialog/parameter-int.cpp -o _src_extension_prefdialog_parameter-int.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/prefdialog/parameter-notebook.cpp -o _src_extension_prefdialog_parameter-notebook.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/prefdialog/parameter-optiongroup.cpp -o _src_extension_prefdialog_parameter-optiongroup.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/prefdialog/parameter-path.cpp -o _src_extension_prefdialog_parameter-path.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/prefdialog/parameter-string.cpp -o _src_extension_prefdialog_parameter-string.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/prefdialog/widget.cpp -o _src_extension_prefdialog_widget.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/prefdialog/widget-box.cpp -o _src_extension_prefdialog_widget-box.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/prefdialog/widget-image.cpp -o _src_extension_prefdialog_widget-image.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/prefdialog/widget-label.cpp -o _src_extension_prefdialog_widget-label.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/prefdialog/widget-separator.cpp -o _src_extension_prefdialog_widget-separator.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/prefdialog/widget-spacer.cpp -o _src_extension_prefdialog_widget-spacer.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/pdfinput/pdf-utils.cpp -o _src_extension_internal_pdfinput_pdf-utils.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/pdfinput/pdf-input.cpp -o _src_extension_internal_pdfinput_pdf-input.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/pdfinput/pdf-parser.cpp -o _src_extension_internal_pdfinput_pdf-parser.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/pdfinput/svg-builder.cpp -o _src_extension_internal_pdfinput_svg-builder.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/pdfinput/poppler-utils.cpp -o _src_extension_internal_pdfinput_poppler-utils.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/pdfinput/poppler-cairo-font-engine.cpp -o _src_extension_internal_pdfinput_poppler-cairo-font-engine.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/cdr-input.cpp -o _src_extension_internal_cdr-input.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/vsd-input.cpp -o _src_extension_internal_vsd-input.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/wpg-input.cpp -o _src_extension_internal_wpg-input.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/rvng-import-dialog.cpp -o _src_extension_internal_rvng-import-dialog.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/bitmap/adaptiveThreshold.cpp -o _src_extension_internal_bitmap_adaptiveThreshold.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/bitmap/addNoise.cpp -o _src_extension_internal_bitmap_addNoise.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/bitmap/blur.cpp -o _src_extension_internal_bitmap_blur.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/bitmap/channel.cpp -o _src_extension_internal_bitmap_channel.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/bitmap/charcoal.cpp -o _src_extension_internal_bitmap_charcoal.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/bitmap/colorize.cpp -o _src_extension_internal_bitmap_colorize.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/bitmap/contrast.cpp -o _src_extension_internal_bitmap_contrast.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/bitmap/crop.cpp -o _src_extension_internal_bitmap_crop.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/bitmap/cycleColormap.cpp -o _src_extension_internal_bitmap_cycleColormap.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/bitmap/despeckle.cpp -o _src_extension_internal_bitmap_despeckle.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/bitmap/edge.cpp -o _src_extension_internal_bitmap_edge.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/bitmap/emboss.cpp -o _src_extension_internal_bitmap_emboss.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/bitmap/enhance.cpp -o _src_extension_internal_bitmap_enhance.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/bitmap/equalize.cpp -o _src_extension_internal_bitmap_equalize.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/bitmap/gaussianBlur.cpp -o _src_extension_internal_bitmap_gaussianBlur.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/bitmap/imagemagick.cpp -o _src_extension_internal_bitmap_imagemagick.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/bitmap/implode.cpp -o _src_extension_internal_bitmap_implode.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/bitmap/level.cpp -o _src_extension_internal_bitmap_level.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/bitmap/levelChannel.cpp -o _src_extension_internal_bitmap_levelChannel.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/bitmap/medianFilter.cpp -o _src_extension_internal_bitmap_medianFilter.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/bitmap/modulate.cpp -o _src_extension_internal_bitmap_modulate.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/bitmap/negate.cpp -o _src_extension_internal_bitmap_negate.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/bitmap/normalize.cpp -o _src_extension_internal_bitmap_normalize.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/bitmap/oilPaint.cpp -o _src_extension_internal_bitmap_oilPaint.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/bitmap/opacity.cpp -o _src_extension_internal_bitmap_opacity.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/bitmap/raise.cpp -o _src_extension_internal_bitmap_raise.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/bitmap/reduceNoise.cpp -o _src_extension_internal_bitmap_reduceNoise.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/bitmap/sample.cpp -o _src_extension_internal_bitmap_sample.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/bitmap/shade.cpp -o _src_extension_internal_bitmap_shade.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/bitmap/sharpen.cpp -o _src_extension_internal_bitmap_sharpen.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/bitmap/solarize.cpp -o _src_extension_internal_bitmap_solarize.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/bitmap/spread.cpp -o _src_extension_internal_bitmap_spread.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/bitmap/swirl.cpp -o _src_extension_internal_bitmap_swirl.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/bitmap/threshold.cpp -o _src_extension_internal_bitmap_threshold.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/bitmap/unsharpmask.cpp -o _src_extension_internal_bitmap_unsharpmask.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extension/internal/bitmap/wave.cpp -o _src_extension_internal_bitmap_wave.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/helper/choose-file.cpp -o _src_helper_choose-file.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/helper/geom.cpp -o _src_helper_geom.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/helper/geom-nodetype.cpp -o _src_helper_geom-nodetype.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/helper/geom-pathstroke.cpp -o _src_helper_geom-pathstroke.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/helper/geom-pathvector_nodesatellites.cpp -o _src_helper_geom-pathvector_nodesatellites.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/helper/geom-nodesatellite.cpp -o _src_helper_geom-nodesatellite.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/helper/gettext.cpp -o _src_helper_gettext.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/helper/pixbuf-ops.cpp -o _src_helper_pixbuf-ops.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/helper/png-write.cpp -o _src_helper_png-write.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/helper/save-image.cpp -o _src_helper_save-image.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/helper/stock-items.cpp -o _src_helper_stock-items.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/io/dir-util.cpp -o _src_io_dir-util.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/io/file.cpp -o _src_io_file.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/io/file-export-cmd.cpp -o _src_io_file-export-cmd.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/io/resource.cpp -o _src_io_resource.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/io/fix-broken-links.cpp -o _src_io_fix-broken-links.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/io/stream/bufferstream.cpp -o _src_io_stream_bufferstream.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/io/stream/gzipstream.cpp -o _src_io_stream_gzipstream.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/io/stream/inkscapestream.cpp -o _src_io_stream_inkscapestream.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/io/stream/stringstream.cpp -o _src_io_stream_stringstream.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/io/stream/uristream.cpp -o _src_io_stream_uristream.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/io/stream/xsltstream.cpp -o _src_io_stream_xsltstream.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/io/sys.cpp -o _src_io_sys.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/effect.cpp -o _src_live_effects_effect.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/fill-conversion.cpp -o _src_live_effects_fill-conversion.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/lpe-angle_bisector.cpp -o _src_live_effects_lpe-angle_bisector.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/lpe-attach-path.cpp -o _src_live_effects_lpe-attach-path.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/lpe-bendpath.cpp -o _src_live_effects_lpe-bendpath.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/lpe-bool.cpp -o _src_live_effects_lpe-bool.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/lpe-bounding-box.cpp -o _src_live_effects_lpe-bounding-box.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/lpe-bspline.cpp -o _src_live_effects_lpe-bspline.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/lpe-circle_3pts.cpp -o _src_live_effects_lpe-circle_3pts.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/lpe-circle_with_radius.cpp -o _src_live_effects_lpe-circle_with_radius.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/lpe-clone-original.cpp -o _src_live_effects_lpe-clone-original.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/lpe-constructgrid.cpp -o _src_live_effects_lpe-constructgrid.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/lpe-copy_rotate.cpp -o _src_live_effects_lpe-copy_rotate.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/lpe-curvestitch.cpp -o _src_live_effects_lpe-curvestitch.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/lpe-dashed-stroke.cpp -o _src_live_effects_lpe-dashed-stroke.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/lpe-dynastroke.cpp -o _src_live_effects_lpe-dynastroke.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/lpe-ellipse_5pts.cpp -o _src_live_effects_lpe-ellipse_5pts.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/lpe-embrodery-stitch.cpp -o _src_live_effects_lpe-embrodery-stitch.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/lpe-embrodery-stitch-ordering.cpp -o _src_live_effects_lpe-embrodery-stitch-ordering.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/lpe-envelope.cpp -o _src_live_effects_lpe-envelope.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/lpe-extrude.cpp -o _src_live_effects_lpe-extrude.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/lpe-fill-between-many.cpp -o _src_live_effects_lpe-fill-between-many.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/lpe-fill-between-strokes.cpp -o _src_live_effects_lpe-fill-between-strokes.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/lpe-fillet-chamfer.cpp -o _src_live_effects_lpe-fillet-chamfer.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/lpe-gears.cpp -o _src_live_effects_lpe-gears.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/lpe-interpolate.cpp -o _src_live_effects_lpe-interpolate.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/lpe-interpolate_points.cpp -o _src_live_effects_lpe-interpolate_points.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/lpe-jointype.cpp -o _src_live_effects_lpe-jointype.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/lpe-knot.cpp -o _src_live_effects_lpe-knot.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/lpe-lattice.cpp -o _src_live_effects_lpe-lattice.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/lpe-lattice2.cpp -o _src_live_effects_lpe-lattice2.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/lpe-line_segment.cpp -o _src_live_effects_lpe-line_segment.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/lpe-measure-segments.cpp -o _src_live_effects_lpe-measure-segments.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/lpe-mirror_symmetry.cpp -o _src_live_effects_lpe-mirror_symmetry.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/lpe-offset.cpp -o _src_live_effects_lpe-offset.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/lpe-parallel.cpp -o _src_live_effects_lpe-parallel.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/lpe-path_length.cpp -o _src_live_effects_lpe-path_length.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/lpe-patternalongpath.cpp -o _src_live_effects_lpe-patternalongpath.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/lpe-perp_bisector.cpp -o _src_live_effects_lpe-perp_bisector.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/lpe-perspective-envelope.cpp -o _src_live_effects_lpe-perspective-envelope.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/lpe-powerclip.cpp -o _src_live_effects_lpe-powerclip.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/lpe-powermask.cpp -o _src_live_effects_lpe-powermask.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/lpe-powerstroke.cpp -o _src_live_effects_lpe-powerstroke.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/lpe-pts2ellipse.cpp -o _src_live_effects_lpe-pts2ellipse.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/lpe-recursiveskeleton.cpp -o _src_live_effects_lpe-recursiveskeleton.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/lpe-rough-hatches.cpp -o _src_live_effects_lpe-rough-hatches.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/lpe-roughen.cpp -o _src_live_effects_lpe-roughen.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/lpe-ruler.cpp -o _src_live_effects_lpe-ruler.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/lpe-show_handles.cpp -o _src_live_effects_lpe-show_handles.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/lpe-simplify.cpp -o _src_live_effects_lpe-simplify.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/lpe-skeleton.cpp -o _src_live_effects_lpe-skeleton.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/lpe-sketch.cpp -o _src_live_effects_lpe-sketch.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/lpe-slice.cpp -o _src_live_effects_lpe-slice.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/lpe-spiro.cpp -o _src_live_effects_lpe-spiro.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/lpe-tangent_to_curve.cpp -o _src_live_effects_lpe-tangent_to_curve.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/lpe-taperstroke.cpp -o _src_live_effects_lpe-taperstroke.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/lpe-test-doEffect-stack.cpp -o _src_live_effects_lpe-test-doEffect-stack.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/lpe-text_label.cpp -o _src_live_effects_lpe-text_label.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/lpe-tiling.cpp -o _src_live_effects_lpe-tiling.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/lpe-transform_2pts.cpp -o _src_live_effects_lpe-transform_2pts.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/lpegroupbbox.cpp -o _src_live_effects_lpegroupbbox.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/lpeobject-reference.cpp -o _src_live_effects_lpeobject-reference.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/lpe-vonkoch.cpp -o _src_live_effects_lpe-vonkoch.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/lpeobject.cpp -o _src_live_effects_lpeobject.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/spiro-converters.cpp -o _src_live_effects_spiro-converters.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/spiro.cpp -o _src_live_effects_spiro.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/parameter/array.cpp -o _src_live_effects_parameter_array.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/parameter/bool.cpp -o _src_live_effects_parameter_bool.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/parameter/colorpicker.cpp -o _src_live_effects_parameter_colorpicker.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/parameter/hidden.cpp -o _src_live_effects_parameter_hidden.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/parameter/satellite.cpp -o _src_live_effects_parameter_satellite.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/parameter/satellitearray.cpp -o _src_live_effects_parameter_satellitearray.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/parameter/satellite-reference.cpp -o _src_live_effects_parameter_satellite-reference.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/parameter/message.cpp -o _src_live_effects_parameter_message.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/parameter/originalsatellite.cpp -o _src_live_effects_parameter_originalsatellite.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/parameter/originalpath.cpp -o _src_live_effects_parameter_originalpath.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/parameter/patharray.cpp -o _src_live_effects_parameter_patharray.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/parameter/parameter.cpp -o _src_live_effects_parameter_parameter.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/parameter/path-reference.cpp -o _src_live_effects_parameter_path-reference.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/parameter/path.cpp -o _src_live_effects_parameter_path.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/parameter/point.cpp -o _src_live_effects_parameter_point.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/parameter/powerstrokepointarray.cpp -o _src_live_effects_parameter_powerstrokepointarray.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/parameter/random.cpp -o _src_live_effects_parameter_random.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/parameter/scalararray.cpp -o _src_live_effects_parameter_scalararray.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/parameter/nodesatellitesarray.cpp -o _src_live_effects_parameter_nodesatellitesarray.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/parameter/text.cpp -o _src_live_effects_parameter_text.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/parameter/fontbutton.cpp -o _src_live_effects_parameter_fontbutton.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/parameter/togglebutton.cpp -o _src_live_effects_parameter_togglebutton.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/parameter/transformedpoint.cpp -o _src_live_effects_parameter_transformedpoint.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/parameter/unit.cpp -o _src_live_effects_parameter_unit.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/live_effects/parameter/vector.cpp -o _src_live_effects_parameter_vector.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/box3d-side.cpp -o _src_object_box3d-side.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/box3d.cpp -o _src_object_box3d.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/color-profile.cpp -o _src_object_color-profile.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/object-set.cpp -o _src_object_object-set.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/persp3d-reference.cpp -o _src_object_persp3d-reference.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/persp3d.cpp -o _src_object_persp3d.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/sp-anchor.cpp -o _src_object_sp-anchor.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/sp-clippath.cpp -o _src_object_sp-clippath.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/sp-conn-end-pair.cpp -o _src_object_sp-conn-end-pair.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/sp-conn-end.cpp -o _src_object_sp-conn-end.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/sp-defs.cpp -o _src_object_sp-defs.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/sp-desc.cpp -o _src_object_sp-desc.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/sp-dimensions.cpp -o _src_object_sp-dimensions.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/sp-ellipse.cpp -o _src_object_sp-ellipse.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/sp-factory.cpp -o _src_object_sp-factory.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/sp-filter-reference.cpp -o _src_object_sp-filter-reference.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/sp-filter.cpp -o _src_object_sp-filter.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/sp-flowdiv.cpp -o _src_object_sp-flowdiv.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/sp-flowregion.cpp -o _src_object_sp-flowregion.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/sp-flowtext.cpp -o _src_object_sp-flowtext.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/sp-font-face.cpp -o _src_object_sp-font-face.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/sp-font.cpp -o _src_object_sp-font.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/sp-glyph-kerning.cpp -o _src_object_sp-glyph-kerning.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/sp-glyph.cpp -o _src_object_sp-glyph.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/sp-gradient-reference.cpp -o _src_object_sp-gradient-reference.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/sp-gradient.cpp -o _src_object_sp-gradient.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/sp-grid.cpp -o _src_object_sp-grid.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/sp-guide.cpp -o _src_object_sp-guide.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/sp-hatch-path.cpp -o _src_object_sp-hatch-path.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/sp-hatch.cpp -o _src_object_sp-hatch.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/sp-image.cpp -o _src_object_sp-image.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/sp-item-group.cpp -o _src_object_sp-item-group.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/sp-item-transform.cpp -o _src_object_sp-item-transform.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/sp-item.cpp -o _src_object_sp-item.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/sp-line.cpp -o _src_object_sp-line.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/sp-linear-gradient.cpp -o _src_object_sp-linear-gradient.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/sp-lpe-item.cpp -o _src_object_sp-lpe-item.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/sp-marker.cpp -o _src_object_sp-marker.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/sp-mask.cpp -o _src_object_sp-mask.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/sp-mesh-array.cpp -o _src_object_sp-mesh-array.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/sp-mesh-gradient.cpp -o _src_object_sp-mesh-gradient.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/sp-mesh-patch.cpp -o _src_object_sp-mesh-patch.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/sp-mesh-row.cpp -o _src_object_sp-mesh-row.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/sp-metadata.cpp -o _src_object_sp-metadata.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/sp-missing-glyph.cpp -o _src_object_sp-missing-glyph.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/sp-namedview.cpp -o _src_object_sp-namedview.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/sp-object-group.cpp -o _src_object_sp-object-group.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/sp-object.cpp -o _src_object_sp-object.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/sp-offset.cpp -o _src_object_sp-offset.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/sp-paint-server.cpp -o _src_object_sp-paint-server.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/sp-page.cpp -o _src_object_sp-page.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/sp-path.cpp -o _src_object_sp-path.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/sp-pattern.cpp -o _src_object_sp-pattern.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/sp-polygon.cpp -o _src_object_sp-polygon.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/sp-polyline.cpp -o _src_object_sp-polyline.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/sp-radial-gradient.cpp -o _src_object_sp-radial-gradient.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/sp-rect.cpp -o _src_object_sp-rect.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/sp-root.cpp -o _src_object_sp-root.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/sp-script.cpp -o _src_object_sp-script.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/sp-shape.cpp -o _src_object_sp-shape.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/sp-shape-reference.cpp -o _src_object_sp-shape-reference.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/sp-solid-color.cpp -o _src_object_sp-solid-color.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/sp-spiral.cpp -o _src_object_sp-spiral.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/sp-star.cpp -o _src_object_sp-star.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/sp-stop.cpp -o _src_object_sp-stop.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/sp-string.cpp -o _src_object_sp-string.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/sp-style-elem.cpp -o _src_object_sp-style-elem.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/sp-switch.cpp -o _src_object_sp-switch.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/sp-symbol.cpp -o _src_object_sp-symbol.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/sp-tag-use-reference.cpp -o _src_object_sp-tag-use-reference.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/sp-tag-use.cpp -o _src_object_sp-tag-use.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/sp-tag.cpp -o _src_object_sp-tag.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/sp-text.cpp -o _src_object_sp-text.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/sp-title.cpp -o _src_object_sp-title.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/sp-tref-reference.cpp -o _src_object_sp-tref-reference.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/sp-tref.cpp -o _src_object_sp-tref.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/sp-tspan.cpp -o _src_object_sp-tspan.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/sp-use-reference.cpp -o _src_object_sp-use-reference.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/sp-use.cpp -o _src_object_sp-use.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/uri-references.cpp -o _src_object_uri-references.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/uri.cpp -o _src_object_uri.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/viewbox.cpp -o _src_object_viewbox.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/filters/sp-filter-primitive.cpp -o _src_object_filters_sp-filter-primitive.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/filters/blend.cpp -o _src_object_filters_blend.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/filters/colormatrix.cpp -o _src_object_filters_colormatrix.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/filters/componenttransfer-funcnode.cpp -o _src_object_filters_componenttransfer-funcnode.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/filters/componenttransfer.cpp -o _src_object_filters_componenttransfer.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/filters/composite.cpp -o _src_object_filters_composite.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/filters/convolvematrix.cpp -o _src_object_filters_convolvematrix.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/filters/diffuselighting.cpp -o _src_object_filters_diffuselighting.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/filters/displacementmap.cpp -o _src_object_filters_displacementmap.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/filters/distantlight.cpp -o _src_object_filters_distantlight.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/filters/flood.cpp -o _src_object_filters_flood.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/filters/gaussian-blur.cpp -o _src_object_filters_gaussian-blur.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/filters/image.cpp -o _src_object_filters_image.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/filters/merge.cpp -o _src_object_filters_merge.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/filters/mergenode.cpp -o _src_object_filters_mergenode.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/filters/morphology.cpp -o _src_object_filters_morphology.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/filters/offset.cpp -o _src_object_filters_offset.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/filters/pointlight.cpp -o _src_object_filters_pointlight.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/filters/specularlighting.cpp -o _src_object_filters_specularlighting.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/filters/spotlight.cpp -o _src_object_filters_spotlight.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/filters/slot-resolver.cpp -o _src_object_filters_slot-resolver.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/filters/tile.cpp -o _src_object_filters_tile.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/filters/turbulence.cpp -o _src_object_filters_turbulence.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/algorithms/graphlayout.cpp -o _src_object_algorithms_graphlayout.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/algorithms/removeoverlap.cpp -o _src_object_algorithms_removeoverlap.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object/algorithms/unclump.cpp -o _src_object_algorithms_unclump.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/path/path-boolop.cpp -o _src_path_path-boolop.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/path/path-object-set.cpp -o _src_path_path-object-set.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/path/path-offset.cpp -o _src_path_path-offset.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/path/path-outline.cpp -o _src_path_path-outline.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/path/path-simplify.cpp -o _src_path_path-simplify.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/path/path-util.cpp -o _src_path_path-util.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/path/splinefit/bezier-fit.cpp -o _src_path_splinefit_bezier-fit.o
gcc -c -fPIC $CFLAGS_INKSCAPE ../src/path/splinefit/splinefit.c -o _src_path_splinefit_splinefit.o
gcc -c -fPIC $CFLAGS_INKSCAPE ../src/path/splinefit/splinefont.c -o _src_path_splinefit_splinefont.o
gcc -c -fPIC $CFLAGS_INKSCAPE ../src/path/splinefit/splinerefigure.c -o _src_path_splinefit_splinerefigure.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/svg/css-ostringstream.cpp -o _src_svg_css-ostringstream.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/svg/path-string.cpp -o _src_svg_path-string.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/svg/stringstream.cpp -o _src_svg_stringstream.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/svg/strip-trailing-zeros.cpp -o _src_svg_strip-trailing-zeros.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/svg/svg-affine.cpp -o _src_svg_svg-affine.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/svg/svg-affine-parser.cpp -o _src_svg_svg-affine-parser.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/svg/svg-box.cpp -o _src_svg_svg-box.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/svg/svg-angle.cpp -o _src_svg_svg-angle.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/svg/svg-length.cpp -o _src_svg_svg-length.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/svg/svg-bool.cpp -o _src_svg_svg-bool.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/svg/svg-path.cpp -o _src_svg_svg-path.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/trace/cielab.cpp -o _src_trace_cielab.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/trace/filterset.cpp -o _src_trace_filterset.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/trace/imagemap.cpp -o _src_trace_imagemap.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/trace/imagemap-gdk.cpp -o _src_trace_imagemap-gdk.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/trace/quantize.cpp -o _src_trace_quantize.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/trace/siox.cpp -o _src_trace_siox.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/trace/trace.cpp -o _src_trace_trace.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/trace/potrace/inkscape-potrace.cpp -o _src_trace_potrace_inkscape-potrace.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/trace/autotrace/inkscape-autotrace.cpp -o _src_trace_autotrace_inkscape-autotrace.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/trace/depixelize/inkscape-depixelize.cpp -o _src_trace_depixelize_inkscape-depixelize.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/builder-utils.cpp -o _src_ui_builder-utils.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/clipboard.cpp -o _src_ui_clipboard.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/contextmenu.cpp -o _src_ui_contextmenu.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/controller.cpp -o _src_ui_controller.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/cursor-utils.cpp -o _src_ui_cursor-utils.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/dialog-events.cpp -o _src_ui_dialog-events.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/dialog-run.cpp -o _src_ui_dialog-run.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/draw-anchor.cpp -o _src_ui_draw-anchor.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/drag-and-drop.cpp -o _src_ui_drag-and-drop.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/icon-loader.cpp -o _src_ui_icon-loader.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/interface.cpp -o _src_ui_interface.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/monitor.cpp -o _src_ui_monitor.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/pack.cpp -o _src_ui_pack.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/popup-menu.cpp -o _src_ui_popup-menu.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/shape-editor.cpp -o _src_ui_shape-editor.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/shape-editor-knotholders.cpp -o _src_ui_shape-editor-knotholders.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/simple-pref-pusher.cpp -o _src_ui_simple-pref-pusher.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/shortcuts.cpp -o _src_ui_shortcuts.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/svg-renderer.cpp -o _src_ui_svg-renderer.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/syntax.cpp -o _src_ui_syntax.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/themes.cpp -o _src_ui_themes.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/tool-factory.cpp -o _src_ui_tool-factory.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/util.cpp -o _src_ui_util.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/modifiers.cpp -o _src_ui_modifiers.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/cache/svg_preview_cache.cpp -o _src_ui_cache_svg_preview_cache.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/desktop/document-check.cpp -o _src_ui_desktop_document-check.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/desktop/menubar.cpp -o _src_ui_desktop_menubar.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/desktop/menu-set-tooltips-shift-icons.cpp -o _src_ui_desktop_menu-set-tooltips-shift-icons.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/knot/knot.cpp -o _src_ui_knot_knot.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/knot/knot-holder.cpp -o _src_ui_knot_knot-holder.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/knot/knot-holder-entity.cpp -o _src_ui_knot_knot-holder-entity.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/knot/knot-ptr.cpp -o _src_ui_knot_knot-ptr.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/tool/control-point-selection.cpp -o _src_ui_tool_control-point-selection.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/tool/control-point.cpp -o _src_ui_tool_control-point.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/tool/curve-drag-point.cpp -o _src_ui_tool_curve-drag-point.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/tool/modifier-tracker.cpp -o _src_ui_tool_modifier-tracker.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/tool/multi-path-manipulator.cpp -o _src_ui_tool_multi-path-manipulator.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/tool/node.cpp -o _src_ui_tool_node.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/tool/path-manipulator.cpp -o _src_ui_tool_path-manipulator.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/tool/selectable-control-point.cpp -o _src_ui_tool_selectable-control-point.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/tool/transform-handle-set.cpp -o _src_ui_tool_transform-handle-set.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/toolbar/arc-toolbar.cpp -o _src_ui_toolbar_arc-toolbar.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/toolbar/box3d-toolbar.cpp -o _src_ui_toolbar_box3d-toolbar.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/toolbar/calligraphy-toolbar.cpp -o _src_ui_toolbar_calligraphy-toolbar.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/toolbar/connector-toolbar.cpp -o _src_ui_toolbar_connector-toolbar.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/toolbar/dropper-toolbar.cpp -o _src_ui_toolbar_dropper-toolbar.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/toolbar/marker-toolbar.cpp -o _src_ui_toolbar_marker-toolbar.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/toolbar/eraser-toolbar.cpp -o _src_ui_toolbar_eraser-toolbar.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/toolbar/gradient-toolbar.cpp -o _src_ui_toolbar_gradient-toolbar.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/toolbar/lpe-toolbar.cpp -o _src_ui_toolbar_lpe-toolbar.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/toolbar/measure-toolbar.cpp -o _src_ui_toolbar_measure-toolbar.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/toolbar/mesh-toolbar.cpp -o _src_ui_toolbar_mesh-toolbar.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/toolbar/node-toolbar.cpp -o _src_ui_toolbar_node-toolbar.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/toolbar/page-toolbar.cpp -o _src_ui_toolbar_page-toolbar.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/toolbar/paintbucket-toolbar.cpp -o _src_ui_toolbar_paintbucket-toolbar.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/toolbar/pencil-toolbar.cpp -o _src_ui_toolbar_pencil-toolbar.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/toolbar/rect-toolbar.cpp -o _src_ui_toolbar_rect-toolbar.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/toolbar/select-toolbar.cpp -o _src_ui_toolbar_select-toolbar.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/toolbar/booleans-toolbar.cpp -o _src_ui_toolbar_booleans-toolbar.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/toolbar/spiral-toolbar.cpp -o _src_ui_toolbar_spiral-toolbar.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/toolbar/spray-toolbar.cpp -o _src_ui_toolbar_spray-toolbar.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/toolbar/star-toolbar.cpp -o _src_ui_toolbar_star-toolbar.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/toolbar/text-toolbar.cpp -o _src_ui_toolbar_text-toolbar.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/toolbar/toolbar.cpp -o _src_ui_toolbar_toolbar.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/toolbar/tweak-toolbar.cpp -o _src_ui_toolbar_tweak-toolbar.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/toolbar/zoom-toolbar.cpp -o _src_ui_toolbar_zoom-toolbar.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/toolbar/command-toolbar.cpp -o _src_ui_toolbar_command-toolbar.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/toolbar/tool-toolbar.cpp -o _src_ui_toolbar_tool-toolbar.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/toolbar/snap-toolbar.cpp -o _src_ui_toolbar_snap-toolbar.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/toolbar/toolbars.cpp -o _src_ui_toolbar_toolbars.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/tools/arc-tool.cpp -o _src_ui_tools_arc-tool.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/tools/box3d-tool.cpp -o _src_ui_tools_box3d-tool.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/tools/calligraphic-tool.cpp -o _src_ui_tools_calligraphic-tool.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/tools/connector-tool.cpp -o _src_ui_tools_connector-tool.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/tools/dropper-tool.cpp -o _src_ui_tools_dropper-tool.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/tools/dynamic-base.cpp -o _src_ui_tools_dynamic-base.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/tools/eraser-tool.cpp -o _src_ui_tools_eraser-tool.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/tools/flood-tool.cpp -o _src_ui_tools_flood-tool.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/tools/freehand-base.cpp -o _src_ui_tools_freehand-base.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/tools/gradient-tool.cpp -o _src_ui_tools_gradient-tool.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/tools/lpe-tool.cpp -o _src_ui_tools_lpe-tool.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/tools/measure-tool.cpp -o _src_ui_tools_measure-tool.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/tools/mesh-tool.cpp -o _src_ui_tools_mesh-tool.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/tools/node-tool.cpp -o _src_ui_tools_node-tool.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/tools/object-picker-tool.cpp -o _src_ui_tools_object-picker-tool.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/tools/pages-tool.cpp -o _src_ui_tools_pages-tool.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/tools/pencil-tool.cpp -o _src_ui_tools_pencil-tool.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/tools/pen-tool.cpp -o _src_ui_tools_pen-tool.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/tools/rect-tool.cpp -o _src_ui_tools_rect-tool.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/tools/marker-tool.cpp -o _src_ui_tools_marker-tool.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/tools/select-tool.cpp -o _src_ui_tools_select-tool.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/tools/booleans-builder.cpp -o _src_ui_tools_booleans-builder.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/tools/booleans-tool.cpp -o _src_ui_tools_booleans-tool.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/tools/booleans-subitems.cpp -o _src_ui_tools_booleans-subitems.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/tools/shortcuts.cpp -o _src_ui_tools_shortcuts.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/tools/spiral-tool.cpp -o _src_ui_tools_spiral-tool.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/tools/spray-tool.cpp -o _src_ui_tools_spray-tool.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/tools/star-tool.cpp -o _src_ui_tools_star-tool.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/tools/text-tool.cpp -o _src_ui_tools_text-tool.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/tools/tool-base.cpp -o _src_ui_tools_tool-base.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/tools/tweak-tool.cpp -o _src_ui_tools_tweak-tool.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/tools/zoom-tool.cpp -o _src_ui_tools_zoom-tool.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/dialog/about.cpp -o _src_ui_dialog_about.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/dialog/align-and-distribute.cpp -o _src_ui_dialog_align-and-distribute.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/dialog/calligraphic-profile-rename.cpp -o _src_ui_dialog_calligraphic-profile-rename.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/dialog/clonetiler.cpp -o _src_ui_dialog_clonetiler.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/dialog/color-item.cpp -o _src_ui_dialog_color-item.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/dialog/command-palette.cpp -o _src_ui_dialog_command-palette.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/dialog/attrdialog.cpp -o _src_ui_dialog_attrdialog.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/dialog/dialog-base.cpp -o _src_ui_dialog_dialog-base.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/dialog/dialog-container.cpp -o _src_ui_dialog_dialog-container.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/dialog/dialog-data.cpp -o _src_ui_dialog_dialog-data.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/dialog/dialog-manager.cpp -o _src_ui_dialog_dialog-manager.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/dialog/dialog-multipaned.cpp -o _src_ui_dialog_dialog-multipaned.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/dialog/dialog-notebook.cpp -o _src_ui_dialog_dialog-notebook.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/dialog/dialog-window.cpp -o _src_ui_dialog_dialog-window.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/dialog/document-properties.cpp -o _src_ui_dialog_document-properties.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/dialog/document-resources.cpp -o _src_ui_dialog_document-resources.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/dialog/export.cpp -o _src_ui_dialog_export.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/dialog/export-batch.cpp -o _src_ui_dialog_export-batch.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/dialog/export-single.cpp -o _src_ui_dialog_export-single.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/dialog/extensions-gallery.cpp -o _src_ui_dialog_extensions-gallery.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/dialog/filedialog.cpp -o _src_ui_dialog_filedialog.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/dialog/filedialogimpl-gtkmm.cpp -o _src_ui_dialog_filedialogimpl-gtkmm.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/dialog/fill-and-stroke.cpp -o _src_ui_dialog_fill-and-stroke.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/dialog/filter-effects-dialog.cpp -o _src_ui_dialog_filter-effects-dialog.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/dialog/find.cpp -o _src_ui_dialog_find.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/dialog/font-collections-manager.cpp -o _src_ui_dialog_font-collections-manager.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/dialog/font-substitution.cpp -o _src_ui_dialog_font-substitution.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/dialog/global-palettes.cpp -o _src_ui_dialog_global-palettes.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/dialog/glyphs.cpp -o _src_ui_dialog_glyphs.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/dialog/grid-arrange-tab.cpp -o _src_ui_dialog_grid-arrange-tab.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/dialog/guides.cpp -o _src_ui_dialog_guides.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/dialog/icon-preview.cpp -o _src_ui_dialog_icon-preview.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/dialog/inkscape-preferences.cpp -o _src_ui_dialog_inkscape-preferences.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/dialog/knot-properties.cpp -o _src_ui_dialog_knot-properties.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/dialog/layer-properties.cpp -o _src_ui_dialog_layer-properties.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/dialog/livepatheffect-editor.cpp -o _src_ui_dialog_livepatheffect-editor.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/dialog/lpe-fillet-chamfer-properties.cpp -o _src_ui_dialog_lpe-fillet-chamfer-properties.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/dialog/lpe-powerstroke-properties.cpp -o _src_ui_dialog_lpe-powerstroke-properties.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/dialog/memory.cpp -o _src_ui_dialog_memory.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/dialog/messages.cpp -o _src_ui_dialog_messages.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/dialog/new-from-template.cpp -o _src_ui_dialog_new-from-template.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/dialog/object-attributes.cpp -o _src_ui_dialog_object-attributes.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/dialog/object-properties.cpp -o _src_ui_dialog_object-properties.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/dialog/objects.cpp -o _src_ui_dialog_objects.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/dialog/polar-arrange-tab.cpp -o _src_ui_dialog_polar-arrange-tab.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/dialog/print.cpp -o _src_ui_dialog_print.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/dialog/prototype.cpp -o _src_ui_dialog_prototype.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/dialog/selectorsdialog.cpp -o _src_ui_dialog_selectorsdialog.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/dialog/startup.cpp -o _src_ui_dialog_startup.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/dialog/styledialog.cpp -o _src_ui_dialog_styledialog.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/dialog/svg-fonts-dialog.cpp -o _src_ui_dialog_svg-fonts-dialog.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/dialog/swatches.cpp -o _src_ui_dialog_swatches.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/dialog/symbols.cpp -o _src_ui_dialog_symbols.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/dialog/paint-servers.cpp -o _src_ui_dialog_paint-servers.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/dialog/text-edit.cpp -o _src_ui_dialog_text-edit.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/dialog/tile.cpp -o _src_ui_dialog_tile.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/dialog/tracedialog.cpp -o _src_ui_dialog_tracedialog.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/dialog/transformation.cpp -o _src_ui_dialog_transformation.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/dialog/undo-history.cpp -o _src_ui_dialog_undo-history.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/dialog/xml-tree.cpp -o _src_ui_dialog_xml-tree.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/dialog/save-template-dialog.cpp -o _src_ui_dialog_save-template-dialog.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/iconrenderer.cpp -o _src_ui_widget_iconrenderer.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/alignment-selector.cpp -o _src_ui_widget_alignment-selector.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/anchor-selector.cpp -o _src_ui_widget_anchor-selector.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/bin.cpp -o _src_ui_widget_bin.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/completion-popup.cpp -o _src_ui_widget_completion-popup.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/canvas.cpp -o _src_ui_widget_canvas.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/canvas/stores.cpp -o _src_ui_widget_canvas_stores.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/canvas/synchronizer.cpp -o _src_ui_widget_canvas_synchronizer.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/canvas/util.cpp -o _src_ui_widget_canvas_util.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/canvas/texture.cpp -o _src_ui_widget_canvas_texture.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/canvas/texturecache.cpp -o _src_ui_widget_canvas_texturecache.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/canvas/pixelstreamer.cpp -o _src_ui_widget_canvas_pixelstreamer.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/canvas/updaters.cpp -o _src_ui_widget_canvas_updaters.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/canvas/framecheck.cpp -o _src_ui_widget_canvas_framecheck.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/canvas/glgraphics.cpp -o _src_ui_widget_canvas_glgraphics.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/canvas/cairographics.cpp -o _src_ui_widget_canvas_cairographics.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/canvas/graphics.cpp -o _src_ui_widget_canvas_graphics.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/canvas-grid.cpp -o _src_ui_widget_canvas-grid.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/canvas-notice.cpp -o _src_ui_widget_canvas-notice.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/color-entry.cpp -o _src_ui_widget_color-entry.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/color-notebook.cpp -o _src_ui_widget_color-notebook.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/color-palette.cpp -o _src_ui_widget_color-palette.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/color-palette-preview.cpp -o _src_ui_widget_color-palette-preview.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/color-picker.cpp -o _src_ui_widget_color-picker.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/color-preview.cpp -o _src_ui_widget_color-preview.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/color-scales.cpp -o _src_ui_widget_color-scales.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/color-slider.cpp -o _src_ui_widget_color-slider.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/combo-box-entry-tool-item.cpp -o _src_ui_widget_combo-box-entry-tool-item.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/combo-tool-item.cpp -o _src_ui_widget_combo-tool-item.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/css-name-class-init.cpp -o _src_ui_widget_css-name-class-init.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/custom-tooltip.cpp -o _src_ui_widget_custom-tooltip.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/dash-selector.cpp -o _src_ui_widget_dash-selector.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/desktop-widget.cpp -o _src_ui_widget_desktop-widget.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/entity-entry.cpp -o _src_ui_widget_entity-entry.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/entry.cpp -o _src_ui_widget_entry.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/export-lists.cpp -o _src_ui_widget_export-lists.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/export-preview.cpp -o _src_ui_widget_export-preview.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/filter-effect-chooser.cpp -o _src_ui_widget_filter-effect-chooser.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/fill-style.cpp -o _src_ui_widget_fill-style.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/font-button.cpp -o _src_ui_widget_font-button.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/font-collection-selector.cpp -o _src_ui_widget_font-collection-selector.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/font-list.cpp -o _src_ui_widget_font-list.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/font-selector.cpp -o _src_ui_widget_font-selector.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/font-variants.cpp -o _src_ui_widget_font-variants.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/font-variations.cpp -o _src_ui_widget_font-variations.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/frame.cpp -o _src_ui_widget_frame.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/gradient-image.cpp -o _src_ui_widget_gradient-image.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/gradient-editor.cpp -o _src_ui_widget_gradient-editor.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/gradient-selector.cpp -o _src_ui_widget_gradient-selector.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/gradient-vector-selector.cpp -o _src_ui_widget_gradient-vector-selector.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/gradient-with-stops.cpp -o _src_ui_widget_gradient-with-stops.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/icon-combobox.cpp -o _src_ui_widget_icon-combobox.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/handle-preview.cpp -o _src_ui_widget_handle-preview.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/image-properties.cpp -o _src_ui_widget_image-properties.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/imagetoggler.cpp -o _src_ui_widget_imagetoggler.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/ink-color-wheel.cpp -o _src_ui_widget_ink-color-wheel.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/ink-ruler.cpp -o _src_ui_widget_ink-ruler.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/ink-spinscale.cpp -o _src_ui_widget_ink-spinscale.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/labelled.cpp -o _src_ui_widget_labelled.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/layer-selector.cpp -o _src_ui_widget_layer-selector.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/licensor.cpp -o _src_ui_widget_licensor.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/marker-combo-box.cpp -o _src_ui_widget_marker-combo-box.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/notebook-page.cpp -o _src_ui_widget_notebook-page.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/object-composite-settings.cpp -o _src_ui_widget_object-composite-settings.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/objects-dialog-cells.cpp -o _src_ui_widget_objects-dialog-cells.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/oklab-color-wheel.cpp -o _src_ui_widget_oklab-color-wheel.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/optglarea.cpp -o _src_ui_widget_optglarea.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/page-properties.cpp -o _src_ui_widget_page-properties.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/page-size-preview.cpp -o _src_ui_widget_page-size-preview.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/page-selector.cpp -o _src_ui_widget_page-selector.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/paint-selector.cpp -o _src_ui_widget_paint-selector.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/pattern-editor.cpp -o _src_ui_widget_pattern-editor.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/point.cpp -o _src_ui_widget_point.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/popover-bin.cpp -o _src_ui_widget_popover-bin.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/popover-menu.cpp -o _src_ui_widget_popover-menu.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/popover-menu-item.cpp -o _src_ui_widget_popover-menu-item.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/preferences-widget.cpp -o _src_ui_widget_preferences-widget.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/random.cpp -o _src_ui_widget_random.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/registered-widget.cpp -o _src_ui_widget_registered-widget.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/registry.cpp -o _src_ui_widget_registry.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/rendering-options.cpp -o _src_ui_widget_rendering-options.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/rotateable.cpp -o _src_ui_widget_rotateable.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/scalar-unit.cpp -o _src_ui_widget_scalar-unit.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/scalar.cpp -o _src_ui_widget_scalar.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/scroll-utils.cpp -o _src_ui_widget_scroll-utils.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/selected-style.cpp -o _src_ui_widget_selected-style.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/shapeicon.cpp -o _src_ui_widget_shapeicon.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/spin-scale.cpp -o _src_ui_widget_spin-scale.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/spinbutton.cpp -o _src_ui_widget_spinbutton.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/status-bar.cpp -o _src_ui_widget_status-bar.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/stroke-style.cpp -o _src_ui_widget_stroke-style.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/style-subject.cpp -o _src_ui_widget_style-subject.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/style-swatch.cpp -o _src_ui_widget_style-swatch.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/swatch-selector.cpp -o _src_ui_widget_swatch-selector.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/template-list.cpp -o _src_ui_widget_template-list.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/text.cpp -o _src_ui_widget_text.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/unit-menu.cpp -o _src_ui_widget_unit-menu.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/unit-tracker.cpp -o _src_ui_widget_unit-tracker.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/widget-vfuncs-class-init.cpp -o _src_ui_widget_widget-vfuncs-class-init.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/widget/xml-treeview.cpp -o _src_ui_widget_xml-treeview.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/ui/view/svg-view-widget.cpp -o _src_ui_view_svg-view-widget.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/widgets/sp-attribute-widget.cpp -o _src_widgets_sp-attribute-widget.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/widgets/spw-utilities.cpp -o _src_widgets_spw-utilities.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/xml/composite-node-observer.cpp -o _src_xml_composite-node-observer.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/xml/croco-node-iface.cpp -o _src_xml_croco-node-iface.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/xml/event.cpp -o _src_xml_event.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/xml/log-builder.cpp -o _src_xml_log-builder.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/xml/node-fns.cpp -o _src_xml_node-fns.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/xml/node.cpp -o _src_xml_node.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/xml/node-iterators.cpp -o _src_xml_node-iterators.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/xml/quote.cpp -o _src_xml_quote.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/xml/repr.cpp -o _src_xml_repr.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/xml/repr-css.cpp -o _src_xml_repr-css.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/xml/repr-io.cpp -o _src_xml_repr-io.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/xml/repr-sorting.cpp -o _src_xml_repr-sorting.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/xml/repr-util.cpp -o _src_xml_repr-util.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/xml/simple-document.cpp -o _src_xml_simple-document.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/xml/simple-node.cpp -o _src_xml_simple-node.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/xml/subtree.cpp -o _src_xml_subtree.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/xml/helper-observer.cpp -o _src_xml_helper-observer.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/xml/rebase-hrefs.cpp -o _src_xml_rebase-hrefs.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/xml/href-attribute-helper.cpp -o _src_xml_href-attribute-helper.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/libnrtype/font-factory.cpp -o _src_libnrtype_font-factory.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/libnrtype/font-instance.cpp -o _src_libnrtype_font-instance.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/libnrtype/font-lister.cpp -o _src_libnrtype_font-lister.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/libnrtype/Layout-TNG.cpp -o _src_libnrtype_Layout-TNG.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/libnrtype/Layout-TNG-Compute.cpp -o _src_libnrtype_Layout-TNG-Compute.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/libnrtype/Layout-TNG-Input.cpp -o _src_libnrtype_Layout-TNG-Input.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/libnrtype/Layout-TNG-OutIter.cpp -o _src_libnrtype_Layout-TNG-OutIter.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/libnrtype/Layout-TNG-Output.cpp -o _src_libnrtype_Layout-TNG-Output.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/libnrtype/Layout-TNG-Scanline-Makers.cpp -o _src_libnrtype_Layout-TNG-Scanline-Makers.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/libnrtype/OpenTypeUtil.cpp -o _src_libnrtype_OpenTypeUtil.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/libnrtype/style-attachments.cpp -o _src_libnrtype_style-attachments.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/alignment-snapper.cpp -o _src_alignment-snapper.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/attribute-rel-css.cpp -o _src_attribute-rel-css.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/attribute-rel-svg.cpp -o _src_attribute-rel-svg.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/attribute-rel-util.cpp -o _src_attribute-rel-util.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/attribute-sort-util.cpp -o _src_attribute-sort-util.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/attributes.cpp -o _src_attributes.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/auto-save.cpp -o _src_auto-save.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/axis-manip.cpp -o _src_axis-manip.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/composite-undo-stack-observer.cpp -o _src_composite-undo-stack-observer.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/conditions.cpp -o _src_conditions.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/conn-avoid-ref.cpp -o _src_conn-avoid-ref.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/console-output-undo-observer.cpp -o _src_console-output-undo-observer.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/context-fns.cpp -o _src_context-fns.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/desktop-events.cpp -o _src_desktop-events.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/desktop-style.cpp -o _src_desktop-style.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/desktop.cpp -o _src_desktop.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/distribution-snapper.cpp -o _src_distribution-snapper.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/document-subset.cpp -o _src_document-subset.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/document-undo.cpp -o _src_document-undo.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/document.cpp -o _src_document.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/event-log.cpp -o _src_event-log.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/extract-uri.cpp -o _src_extract-uri.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/file.cpp -o _src_file.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/file-update.cpp -o _src_file-update.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/filter-chemistry.cpp -o _src_filter-chemistry.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/filter-enums.cpp -o _src_filter-enums.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/gc-anchored.cpp -o _src_gc-anchored.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/gc-finalized.cpp -o _src_gc-finalized.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/gradient-chemistry.cpp -o _src_gradient-chemistry.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/gradient-drag.cpp -o _src_gradient-drag.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/guide-snapper.cpp -o _src_guide-snapper.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/grid-snapper.cpp -o _src_grid-snapper.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/id-clash.cpp -o _src_id-clash.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/inkscape.cpp -o _src_inkscape.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/inkscape-version-info.cpp -o _src_inkscape-version-info.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/layer-manager.cpp -o _src_layer-manager.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/line-geometry.cpp -o _src_line-geometry.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/line-snapper.cpp -o _src_line-snapper.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/media.cpp -o _src_media.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/message-context.cpp -o _src_message-context.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/message-stack.cpp -o _src_message-stack.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/mod360.cpp -o _src_mod360.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object-hierarchy.cpp -o _src_object-hierarchy.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/object-snapper.cpp -o _src_object-snapper.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/page-manager.cpp -o _src_page-manager.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/path-chemistry.cpp -o _src_path-chemistry.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/path-prefix.cpp -o _src_path-prefix.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/perspective-line.cpp -o _src_perspective-line.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/preferences.cpp -o _src_preferences.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/print.cpp -o _src_print.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/proj_pt.cpp -o _src_proj_pt.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/pure-transform.cpp -o _src_pure-transform.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/rdf.cpp -o _src_rdf.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/rubberband.cpp -o _src_rubberband.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/selcue.cpp -o _src_selcue.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/selection-chemistry.cpp -o _src_selection-chemistry.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/selection-describer.cpp -o _src_selection-describer.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/selection.cpp -o _src_selection.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/seltrans-handles.cpp -o _src_seltrans-handles.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/seltrans.cpp -o _src_seltrans.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/snap-preferences.cpp -o _src_snap-preferences.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/snap.cpp -o _src_snap.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/snapped-curve.cpp -o _src_snapped-curve.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/snapped-line.cpp -o _src_snapped-line.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/snapped-point.cpp -o _src_snapped-point.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/snapper.cpp -o _src_snapper.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/style-internal.cpp -o _src_style-internal.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/style.cpp -o _src_style.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/text-chemistry.cpp -o _src_text-chemistry.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/text-editing.cpp -o _src_text-editing.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/transf_mat_3x4.cpp -o _src_transf_mat_3x4.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/unicoderange.cpp -o _src_unicoderange.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/vanishing-point.cpp -o _src_vanishing-point.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/version.cpp -o _src_version.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/pattern-manager.cpp -o _src_pattern-manager.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/pattern-manipulation.cpp -o _src_pattern-manipulation.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/inkscape-window.cpp -o _src_inkscape-window.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/inkscape-application.cpp -o _src_inkscape-application.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/actions/actions-effect-data.cpp -o _src_actions_actions-effect-data.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/actions/actions-extra-data.cpp -o _src_actions_actions-extra-data.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/actions/actions-hint-data.cpp -o _src_actions_actions-hint-data.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/actions/actions-base.cpp -o _src_actions_actions-base.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/actions/actions-canvas-mode.cpp -o _src_actions_actions-canvas-mode.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/actions/actions-canvas-snapping.cpp -o _src_actions_actions-canvas-snapping.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/actions/actions-canvas-transform.cpp -o _src_actions_actions-canvas-transform.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/actions/actions-dialogs.cpp -o _src_actions_actions-dialogs.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/actions/actions-edit-document.cpp -o _src_actions_actions-edit-document.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/actions/actions-edit-window.cpp -o _src_actions_actions-edit-window.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/actions/actions-edit.cpp -o _src_actions_actions-edit.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/actions/actions-effect.cpp -o _src_actions_actions-effect.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/actions/actions-element-a.cpp -o _src_actions_actions-element-a.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/actions/actions-element-image.cpp -o _src_actions_actions-element-image.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/actions/actions-file-window.cpp -o _src_actions_actions-file-window.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/actions/actions-file.cpp -o _src_actions_actions-file.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/actions/actions-helper.cpp -o _src_actions_actions-helper.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/actions/actions-helper-gui.cpp -o _src_actions_actions-helper-gui.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/actions/actions-help-url.cpp -o _src_actions_actions-help-url.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/actions/actions-hide-lock.cpp -o _src_actions_actions-hide-lock.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/actions/actions-layer.cpp -o _src_actions_actions-layer.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/actions/actions-node-align.cpp -o _src_actions_actions-node-align.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/actions/actions-object.cpp -o _src_actions_actions-object.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/actions/actions-object-align.cpp -o _src_actions_actions-object-align.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/actions/actions-output.cpp -o _src_actions_actions-output.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/actions/actions-paths.cpp -o _src_actions_actions-paths.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/actions/actions-selection-object.cpp -o _src_actions_actions-selection-object.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/actions/actions-selection-window.cpp -o _src_actions_actions-selection-window.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/actions/actions-selection.cpp -o _src_actions_actions-selection.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/actions/actions-text.cpp -o _src_actions_actions-text.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/actions/actions-tools.cpp -o _src_actions_actions-tools.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/actions/actions-tutorial.cpp -o _src_actions_actions-tutorial.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/actions/actions-transform.cpp -o _src_actions_actions-transform.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/actions/actions-undo-document.cpp -o _src_actions_actions-undo-document.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/actions/actions-view-mode.cpp -o _src_actions_actions-view-mode.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/actions/actions-view-window.cpp -o _src_actions_actions-view-window.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/actions/actions-window.cpp -o _src_actions_actions-window.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/actions/actions-pages.cpp -o _src_actions_actions-pages.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/actions/actions-svg-processing.cpp -o _src_actions_actions-svg-processing.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/inkview-application.cpp -o _src_inkview-application.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/inkview-window.cpp -o _src_inkview-window.o
g++ -c -fPIC $CFLAGS_INKSCAPE ../src/manipulation/copy-resource.cpp -o _src_manipulation_copy-resource.o
g++ -c -fPIC -I../src ../__generated/inkscape-version.cpp -o generated_inkscape-version.o
g++ -shared -o libinkscape_base.so  \
    _src_async_async.o \
    _src_colors_cms_profile.o \
    _src_colors_cms_system.o \
    _src_colors_cms_transform.o \
    _src_colors_color.o \
    _src_colors_document-cms.o \
    _src_colors_dragndrop.o \
    _src_colors_manager.o \
    _src_colors_parser.o \
    _src_colors_printer.o \
    _src_colors_color-set.o \
    _src_colors_spaces_base.o \
    _src_colors_spaces_cms.o \
    _src_colors_spaces_cmyk.o \
    _src_colors_spaces_components.o \
    _src_colors_spaces_gray.o \
    _src_colors_spaces_hsl.o \
    _src_colors_spaces_hsluv.o \
    _src_colors_spaces_hsv.o \
    _src_colors_spaces_lab.o \
    _src_colors_spaces_lch.o \
    _src_colors_spaces_linear-rgb.o \
    _src_colors_spaces_luv.o \
    _src_colors_spaces_okhsl.o \
    _src_colors_spaces_oklab.o \
    _src_colors_spaces_oklch.o \
    _src_colors_spaces_named.o \
    _src_colors_spaces_rgb.o \
    _src_colors_spaces_xyz.o \
    _src_colors_utils.o \
    _src_colors_xml-color.o \
    _src_debug_demangle.o \
    _src_debug_heap.o \
    _src_debug_logger.o \
    _src_debug_sysv-heap.o \
    _src_debug_timestamp.o \
    _src_display_cairo-utils.o \
    _src_display_curve.o \
    _src_display_drawing-context.o \
    _src_display_drawing-group.o \
    _src_display_drawing-image.o \
    _src_display_drawing-item.o \
    _src_display_drawing-paintserver.o \
    _src_display_drawing-pattern.o \
    _src_display_drawing-shape.o \
    _src_display_drawing-surface.o \
    _src_display_drawing-text.o \
    _src_display_drawing.o \
    _src_display_nr-3dutils.o \
    _src_display_nr-filter-blend.o \
    _src_display_nr-filter-colormatrix.o \
    _src_display_nr-filter-component-transfer.o \
    _src_display_nr-filter-composite.o \
    _src_display_nr-filter-convolve-matrix.o \
    _src_display_nr-filter-diffuselighting.o \
    _src_display_nr-filter-displacement-map.o \
    _src_display_nr-filter-flood.o \
    _src_display_nr-filter-gaussian.o \
    _src_display_nr-filter-image.o \
    _src_display_nr-filter-merge.o \
    _src_display_nr-filter-morphology.o \
    _src_display_nr-filter-offset.o \
    _src_display_nr-filter-primitive.o \
    _src_display_nr-filter-slot.o \
    _src_display_nr-filter-specularlighting.o \
    _src_display_nr-filter-tile.o \
    _src_display_nr-filter-turbulence.o \
    _src_display_nr-filter-units.o \
    _src_display_nr-filter.o \
    _src_display_nr-light.o \
    _src_display_nr-style.o \
    _src_display_nr-svgfonts.o \
    _src_display_translucency-group.o \
    _src_display_control_canvas-temporary-item-list.o \
    _src_display_control_canvas-temporary-item.o \
    _src_display_control_ctrl-handle-manager.o \
    _src_display_control_ctrl-handle-rendering.o \
    _src_display_control_ctrl-handle-styling.o \
    _src_display_control_snap-indicator.o \
    _src_display_control_canvas-item.o \
    _src_display_control_canvas-item-bpath.o \
    _src_display_control_canvas-item-catchall.o \
    _src_display_control_canvas-item-context.o \
    _src_display_control_canvas-item-ctrl.o \
    _src_display_control_canvas-item-curve.o \
    _src_display_control_canvas-item-drawing.o \
    _src_display_control_canvas-item-grid.o \
    _src_display_control_canvas-item-group.o \
    _src_display_control_canvas-item-guideline.o \
    _src_display_control_canvas-item-quad.o \
    _src_display_control_canvas-item-rect.o \
    _src_display_control_canvas-item-text.o \
    _src_display_control_canvas-page.o \
    _src_extension_db.o \
    _src_extension_dependency.o \
    _src_extension_processing-action.o \
    _src_extension_effect.o \
    _src_extension_execution-env.o \
    _src_extension_extension.o \
    _src_extension_init.o \
    _src_extension_input.o \
    _src_extension_output.o \
    _src_extension_patheffect.o \
    _src_extension_print.o \
    _src_extension_system.o \
    _src_extension_template.o \
    _src_extension_timer.o \
    _src_extension_loader.o \
    _src_extension_implementation_implementation.o \
    _src_extension_implementation_xslt.o \
    _src_extension_implementation_script.o \
    _src_extension_internal_bluredge.o \
    _src_extension_internal_cairo-ps-out.o \
    _src_extension_internal_cairo-render-context.o \
    _src_extension_internal_cairo-renderer.o \
    _src_extension_internal_cairo-renderer-pdf-out.o \
    _src_extension_internal_emf-inout.o \
    _src_extension_internal_emf-print.o \
    _src_extension_internal_gdkpixbuf-input.o \
    _src_extension_internal_gimpgrad.o \
    _src_extension_internal_grid.o \
    _src_extension_internal_image-resolution.o \
    _src_extension_internal_latex-pstricks.o \
    _src_extension_internal_latex-pstricks-out.o \
    _src_extension_internal_metafile-inout.o \
    _src_extension_internal_metafile-print.o \
    _src_extension_internal_odf.o \
    _src_extension_internal_latex-text-renderer.o \
    _src_extension_internal_png-output.o \
    _src_extension_internal_pov-out.o \
    _src_extension_internal_svg.o \
    _src_extension_internal_svgz.o \
    _src_extension_internal_template-base.o \
    _src_extension_internal_template-from-file.o \
    _src_extension_internal_template-other.o \
    _src_extension_internal_template-paper.o \
    _src_extension_internal_template-screen.o \
    _src_extension_internal_template-social.o \
    _src_extension_internal_template-video.o \
    _src_extension_internal_text_reassemble.o \
    _src_extension_internal_wmf-inout.o \
    _src_extension_internal_wmf-print.o \
    _src_extension_internal_filter_filter-all.o \
    _src_extension_internal_filter_filter-file.o \
    _src_extension_internal_filter_filter.o \
    _src_extension_prefdialog_prefdialog.o \
    _src_extension_prefdialog_parameter.o \
    _src_extension_prefdialog_parameter-bool.o \
    _src_extension_prefdialog_parameter-color.o \
    _src_extension_prefdialog_parameter-float.o \
    _src_extension_prefdialog_parameter-int.o \
    _src_extension_prefdialog_parameter-notebook.o \
    _src_extension_prefdialog_parameter-optiongroup.o \
    _src_extension_prefdialog_parameter-path.o \
    _src_extension_prefdialog_parameter-string.o \
    _src_extension_prefdialog_widget.o \
    _src_extension_prefdialog_widget-box.o \
    _src_extension_prefdialog_widget-image.o \
    _src_extension_prefdialog_widget-label.o \
    _src_extension_prefdialog_widget-separator.o \
    _src_extension_prefdialog_widget-spacer.o \
    _src_extension_internal_pdfinput_pdf-utils.o \
    _src_extension_internal_pdfinput_pdf-input.o \
    _src_extension_internal_pdfinput_pdf-parser.o \
    _src_extension_internal_pdfinput_svg-builder.o \
    _src_extension_internal_pdfinput_poppler-utils.o \
    _src_extension_internal_pdfinput_poppler-cairo-font-engine.o \
    _src_extension_internal_cdr-input.o \
    _src_extension_internal_vsd-input.o \
    _src_extension_internal_wpg-input.o \
    _src_extension_internal_rvng-import-dialog.o \
    _src_extension_internal_bitmap_adaptiveThreshold.o \
    _src_extension_internal_bitmap_addNoise.o \
    _src_extension_internal_bitmap_blur.o \
    _src_extension_internal_bitmap_channel.o \
    _src_extension_internal_bitmap_charcoal.o \
    _src_extension_internal_bitmap_colorize.o \
    _src_extension_internal_bitmap_contrast.o \
    _src_extension_internal_bitmap_crop.o \
    _src_extension_internal_bitmap_cycleColormap.o \
    _src_extension_internal_bitmap_despeckle.o \
    _src_extension_internal_bitmap_edge.o \
    _src_extension_internal_bitmap_emboss.o \
    _src_extension_internal_bitmap_enhance.o \
    _src_extension_internal_bitmap_equalize.o \
    _src_extension_internal_bitmap_gaussianBlur.o \
    _src_extension_internal_bitmap_imagemagick.o \
    _src_extension_internal_bitmap_implode.o \
    _src_extension_internal_bitmap_level.o \
    _src_extension_internal_bitmap_levelChannel.o \
    _src_extension_internal_bitmap_medianFilter.o \
    _src_extension_internal_bitmap_modulate.o \
    _src_extension_internal_bitmap_negate.o \
    _src_extension_internal_bitmap_normalize.o \
    _src_extension_internal_bitmap_oilPaint.o \
    _src_extension_internal_bitmap_opacity.o \
    _src_extension_internal_bitmap_raise.o \
    _src_extension_internal_bitmap_reduceNoise.o \
    _src_extension_internal_bitmap_sample.o \
    _src_extension_internal_bitmap_shade.o \
    _src_extension_internal_bitmap_sharpen.o \
    _src_extension_internal_bitmap_solarize.o \
    _src_extension_internal_bitmap_spread.o \
    _src_extension_internal_bitmap_swirl.o \
    _src_extension_internal_bitmap_threshold.o \
    _src_extension_internal_bitmap_unsharpmask.o \
    _src_extension_internal_bitmap_wave.o \
    _src_helper_choose-file.o \
    _src_helper_geom.o \
    _src_helper_geom-nodetype.o \
    _src_helper_geom-pathstroke.o \
    _src_helper_geom-pathvector_nodesatellites.o \
    _src_helper_geom-nodesatellite.o \
    _src_helper_gettext.o \
    _src_helper_pixbuf-ops.o \
    _src_helper_png-write.o \
    _src_helper_save-image.o \
    _src_helper_stock-items.o \
    _src_io_dir-util.o \
    _src_io_file.o \
    _src_io_file-export-cmd.o \
    _src_io_resource.o \
    _src_io_fix-broken-links.o \
    _src_io_stream_bufferstream.o \
    _src_io_stream_gzipstream.o \
    _src_io_stream_inkscapestream.o \
    _src_io_stream_stringstream.o \
    _src_io_stream_uristream.o \
    _src_io_stream_xsltstream.o \
    _src_io_sys.o \
    _src_live_effects_effect.o \
    _src_live_effects_fill-conversion.o \
    _src_live_effects_lpe-angle_bisector.o \
    _src_live_effects_lpe-attach-path.o \
    _src_live_effects_lpe-bendpath.o \
    _src_live_effects_lpe-bool.o \
    _src_live_effects_lpe-bounding-box.o \
    _src_live_effects_lpe-bspline.o \
    _src_live_effects_lpe-circle_3pts.o \
    _src_live_effects_lpe-circle_with_radius.o \
    _src_live_effects_lpe-clone-original.o \
    _src_live_effects_lpe-constructgrid.o \
    _src_live_effects_lpe-copy_rotate.o \
    _src_live_effects_lpe-curvestitch.o \
    _src_live_effects_lpe-dashed-stroke.o \
    _src_live_effects_lpe-dynastroke.o \
    _src_live_effects_lpe-ellipse_5pts.o \
    _src_live_effects_lpe-embrodery-stitch.o \
    _src_live_effects_lpe-embrodery-stitch-ordering.o \
    _src_live_effects_lpe-envelope.o \
    _src_live_effects_lpe-extrude.o \
    _src_live_effects_lpe-fill-between-many.o \
    _src_live_effects_lpe-fill-between-strokes.o \
    _src_live_effects_lpe-fillet-chamfer.o \
    _src_live_effects_lpe-gears.o \
    _src_live_effects_lpe-interpolate.o \
    _src_live_effects_lpe-interpolate_points.o \
    _src_live_effects_lpe-jointype.o \
    _src_live_effects_lpe-knot.o \
    _src_live_effects_lpe-lattice.o \
    _src_live_effects_lpe-lattice2.o \
    _src_live_effects_lpe-line_segment.o \
    _src_live_effects_lpe-measure-segments.o \
    _src_live_effects_lpe-mirror_symmetry.o \
    _src_live_effects_lpe-offset.o \
    _src_live_effects_lpe-parallel.o \
    _src_live_effects_lpe-path_length.o \
    _src_live_effects_lpe-patternalongpath.o \
    _src_live_effects_lpe-perp_bisector.o \
    _src_live_effects_lpe-perspective-envelope.o \
    _src_live_effects_lpe-powerclip.o \
    _src_live_effects_lpe-powermask.o \
    _src_live_effects_lpe-powerstroke.o \
    _src_live_effects_lpe-pts2ellipse.o \
    _src_live_effects_lpe-recursiveskeleton.o \
    _src_live_effects_lpe-rough-hatches.o \
    _src_live_effects_lpe-roughen.o \
    _src_live_effects_lpe-ruler.o \
    _src_live_effects_lpe-show_handles.o \
    _src_live_effects_lpe-simplify.o \
    _src_live_effects_lpe-skeleton.o \
    _src_live_effects_lpe-sketch.o \
    _src_live_effects_lpe-slice.o \
    _src_live_effects_lpe-spiro.o \
    _src_live_effects_lpe-tangent_to_curve.o \
    _src_live_effects_lpe-taperstroke.o \
    _src_live_effects_lpe-test-doEffect-stack.o \
    _src_live_effects_lpe-text_label.o \
    _src_live_effects_lpe-tiling.o \
    _src_live_effects_lpe-transform_2pts.o \
    _src_live_effects_lpegroupbbox.o \
    _src_live_effects_lpeobject-reference.o \
    _src_live_effects_lpe-vonkoch.o \
    _src_live_effects_lpeobject.o \
    _src_live_effects_spiro-converters.o \
    _src_live_effects_spiro.o \
    _src_live_effects_parameter_array.o \
    _src_live_effects_parameter_bool.o \
    _src_live_effects_parameter_colorpicker.o \
    _src_live_effects_parameter_hidden.o \
    _src_live_effects_parameter_satellite.o \
    _src_live_effects_parameter_satellitearray.o \
    _src_live_effects_parameter_satellite-reference.o \
    _src_live_effects_parameter_message.o \
    _src_live_effects_parameter_originalsatellite.o \
    _src_live_effects_parameter_originalpath.o \
    _src_live_effects_parameter_patharray.o \
    _src_live_effects_parameter_parameter.o \
    _src_live_effects_parameter_path-reference.o \
    _src_live_effects_parameter_path.o \
    _src_live_effects_parameter_point.o \
    _src_live_effects_parameter_powerstrokepointarray.o \
    _src_live_effects_parameter_random.o \
    _src_live_effects_parameter_scalararray.o \
    _src_live_effects_parameter_nodesatellitesarray.o \
    _src_live_effects_parameter_text.o \
    _src_live_effects_parameter_fontbutton.o \
    _src_live_effects_parameter_togglebutton.o \
    _src_live_effects_parameter_transformedpoint.o \
    _src_live_effects_parameter_unit.o \
    _src_live_effects_parameter_vector.o \
    _src_object_box3d-side.o \
    _src_object_box3d.o \
    _src_object_color-profile.o \
    _src_object_object-set.o \
    _src_object_persp3d-reference.o \
    _src_object_persp3d.o \
    _src_object_sp-anchor.o \
    _src_object_sp-clippath.o \
    _src_object_sp-conn-end-pair.o \
    _src_object_sp-conn-end.o \
    _src_object_sp-defs.o \
    _src_object_sp-desc.o \
    _src_object_sp-dimensions.o \
    _src_object_sp-ellipse.o \
    _src_object_sp-factory.o \
    _src_object_sp-filter-reference.o \
    _src_object_sp-filter.o \
    _src_object_sp-flowdiv.o \
    _src_object_sp-flowregion.o \
    _src_object_sp-flowtext.o \
    _src_object_sp-font-face.o \
    _src_object_sp-font.o \
    _src_object_sp-glyph-kerning.o \
    _src_object_sp-glyph.o \
    _src_object_sp-gradient-reference.o \
    _src_object_sp-gradient.o \
    _src_object_sp-grid.o \
    _src_object_sp-guide.o \
    _src_object_sp-hatch-path.o \
    _src_object_sp-hatch.o \
    _src_object_sp-image.o \
    _src_object_sp-item-group.o \
    _src_object_sp-item-transform.o \
    _src_object_sp-item.o \
    _src_object_sp-line.o \
    _src_object_sp-linear-gradient.o \
    _src_object_sp-lpe-item.o \
    _src_object_sp-marker.o \
    _src_object_sp-mask.o \
    _src_object_sp-mesh-array.o \
    _src_object_sp-mesh-gradient.o \
    _src_object_sp-mesh-patch.o \
    _src_object_sp-mesh-row.o \
    _src_object_sp-metadata.o \
    _src_object_sp-missing-glyph.o \
    _src_object_sp-namedview.o \
    _src_object_sp-object-group.o \
    _src_object_sp-object.o \
    _src_object_sp-offset.o \
    _src_object_sp-paint-server.o \
    _src_object_sp-page.o \
    _src_object_sp-path.o \
    _src_object_sp-pattern.o \
    _src_object_sp-polygon.o \
    _src_object_sp-polyline.o \
    _src_object_sp-radial-gradient.o \
    _src_object_sp-rect.o \
    _src_object_sp-root.o \
    _src_object_sp-script.o \
    _src_object_sp-shape.o \
    _src_object_sp-shape-reference.o \
    _src_object_sp-solid-color.o \
    _src_object_sp-spiral.o \
    _src_object_sp-star.o \
    _src_object_sp-stop.o \
    _src_object_sp-string.o \
    _src_object_sp-style-elem.o \
    _src_object_sp-switch.o \
    _src_object_sp-symbol.o \
    _src_object_sp-tag-use-reference.o \
    _src_object_sp-tag-use.o \
    _src_object_sp-tag.o \
    _src_object_sp-text.o \
    _src_object_sp-title.o \
    _src_object_sp-tref-reference.o \
    _src_object_sp-tref.o \
    _src_object_sp-tspan.o \
    _src_object_sp-use-reference.o \
    _src_object_sp-use.o \
    _src_object_uri-references.o \
    _src_object_uri.o \
    _src_object_viewbox.o \
    _src_object_filters_sp-filter-primitive.o \
    _src_object_filters_blend.o \
    _src_object_filters_colormatrix.o \
    _src_object_filters_componenttransfer-funcnode.o \
    _src_object_filters_componenttransfer.o \
    _src_object_filters_composite.o \
    _src_object_filters_convolvematrix.o \
    _src_object_filters_diffuselighting.o \
    _src_object_filters_displacementmap.o \
    _src_object_filters_distantlight.o \
    _src_object_filters_flood.o \
    _src_object_filters_gaussian-blur.o \
    _src_object_filters_image.o \
    _src_object_filters_merge.o \
    _src_object_filters_mergenode.o \
    _src_object_filters_morphology.o \
    _src_object_filters_offset.o \
    _src_object_filters_pointlight.o \
    _src_object_filters_specularlighting.o \
    _src_object_filters_spotlight.o \
    _src_object_filters_slot-resolver.o \
    _src_object_filters_tile.o \
    _src_object_filters_turbulence.o \
    _src_object_algorithms_graphlayout.o \
    _src_object_algorithms_removeoverlap.o \
    _src_object_algorithms_unclump.o \
    _src_path_path-boolop.o \
    _src_path_path-object-set.o \
    _src_path_path-offset.o \
    _src_path_path-outline.o \
    _src_path_path-simplify.o \
    _src_path_path-util.o \
    _src_path_splinefit_bezier-fit.o \
    _src_path_splinefit_splinefit.o \
    _src_path_splinefit_splinefont.o \
    _src_path_splinefit_splinerefigure.o \
    _src_svg_css-ostringstream.o \
    _src_svg_path-string.o \
    _src_svg_stringstream.o \
    _src_svg_strip-trailing-zeros.o \
    _src_svg_svg-affine.o \
    _src_svg_svg-affine-parser.o \
    _src_svg_svg-box.o \
    _src_svg_svg-angle.o \
    _src_svg_svg-length.o \
    _src_svg_svg-bool.o \
    _src_svg_svg-path.o \
    _src_trace_cielab.o \
    _src_trace_filterset.o \
    _src_trace_imagemap.o \
    _src_trace_imagemap-gdk.o \
    _src_trace_quantize.o \
    _src_trace_siox.o \
    _src_trace_trace.o \
    _src_trace_potrace_inkscape-potrace.o \
    _src_trace_autotrace_inkscape-autotrace.o \
    _src_trace_depixelize_inkscape-depixelize.o \
    _src_ui_builder-utils.o \
    _src_ui_clipboard.o \
    _src_ui_contextmenu.o \
    _src_ui_controller.o \
    _src_ui_cursor-utils.o \
    _src_ui_dialog-events.o \
    _src_ui_dialog-run.o \
    _src_ui_draw-anchor.o \
    _src_ui_drag-and-drop.o \
    _src_ui_icon-loader.o \
    _src_ui_interface.o \
    _src_ui_monitor.o \
    _src_ui_pack.o \
    _src_ui_popup-menu.o \
    _src_ui_shape-editor.o \
    _src_ui_shape-editor-knotholders.o \
    _src_ui_simple-pref-pusher.o \
    _src_ui_shortcuts.o \
    _src_ui_svg-renderer.o \
    _src_ui_syntax.o \
    _src_ui_themes.o \
    _src_ui_tool-factory.o \
    _src_ui_util.o \
    _src_ui_modifiers.o \
    _src_ui_cache_svg_preview_cache.o \
    _src_ui_desktop_document-check.o \
    _src_ui_desktop_menubar.o \
    _src_ui_desktop_menu-set-tooltips-shift-icons.o \
    _src_ui_knot_knot.o \
    _src_ui_knot_knot-holder.o \
    _src_ui_knot_knot-holder-entity.o \
    _src_ui_knot_knot-ptr.o \
    _src_ui_tool_control-point-selection.o \
    _src_ui_tool_control-point.o \
    _src_ui_tool_curve-drag-point.o \
    _src_ui_tool_modifier-tracker.o \
    _src_ui_tool_multi-path-manipulator.o \
    _src_ui_tool_node.o \
    _src_ui_tool_path-manipulator.o \
    _src_ui_tool_selectable-control-point.o \
    _src_ui_tool_transform-handle-set.o \
    _src_ui_toolbar_arc-toolbar.o \
    _src_ui_toolbar_box3d-toolbar.o \
    _src_ui_toolbar_calligraphy-toolbar.o \
    _src_ui_toolbar_connector-toolbar.o \
    _src_ui_toolbar_dropper-toolbar.o \
    _src_ui_toolbar_marker-toolbar.o \
    _src_ui_toolbar_eraser-toolbar.o \
    _src_ui_toolbar_gradient-toolbar.o \
    _src_ui_toolbar_lpe-toolbar.o \
    _src_ui_toolbar_measure-toolbar.o \
    _src_ui_toolbar_mesh-toolbar.o \
    _src_ui_toolbar_node-toolbar.o \
    _src_ui_toolbar_page-toolbar.o \
    _src_ui_toolbar_paintbucket-toolbar.o \
    _src_ui_toolbar_pencil-toolbar.o \
    _src_ui_toolbar_rect-toolbar.o \
    _src_ui_toolbar_select-toolbar.o \
    _src_ui_toolbar_booleans-toolbar.o \
    _src_ui_toolbar_spiral-toolbar.o \
    _src_ui_toolbar_spray-toolbar.o \
    _src_ui_toolbar_star-toolbar.o \
    _src_ui_toolbar_text-toolbar.o \
    _src_ui_toolbar_toolbar.o \
    _src_ui_toolbar_tweak-toolbar.o \
    _src_ui_toolbar_zoom-toolbar.o \
    _src_ui_toolbar_command-toolbar.o \
    _src_ui_toolbar_tool-toolbar.o \
    _src_ui_toolbar_snap-toolbar.o \
    _src_ui_toolbar_toolbars.o \
    _src_ui_tools_arc-tool.o \
    _src_ui_tools_box3d-tool.o \
    _src_ui_tools_calligraphic-tool.o \
    _src_ui_tools_connector-tool.o \
    _src_ui_tools_dropper-tool.o \
    _src_ui_tools_dynamic-base.o \
    _src_ui_tools_eraser-tool.o \
    _src_ui_tools_flood-tool.o \
    _src_ui_tools_freehand-base.o \
    _src_ui_tools_gradient-tool.o \
    _src_ui_tools_lpe-tool.o \
    _src_ui_tools_measure-tool.o \
    _src_ui_tools_mesh-tool.o \
    _src_ui_tools_node-tool.o \
    _src_ui_tools_object-picker-tool.o \
    _src_ui_tools_pages-tool.o \
    _src_ui_tools_pencil-tool.o \
    _src_ui_tools_pen-tool.o \
    _src_ui_tools_rect-tool.o \
    _src_ui_tools_marker-tool.o \
    _src_ui_tools_select-tool.o \
    _src_ui_tools_booleans-builder.o \
    _src_ui_tools_booleans-tool.o \
    _src_ui_tools_booleans-subitems.o \
    _src_ui_tools_shortcuts.o \
    _src_ui_tools_spiral-tool.o \
    _src_ui_tools_spray-tool.o \
    _src_ui_tools_star-tool.o \
    _src_ui_tools_text-tool.o \
    _src_ui_tools_tool-base.o \
    _src_ui_tools_tweak-tool.o \
    _src_ui_tools_zoom-tool.o \
    _src_ui_dialog_about.o \
    _src_ui_dialog_align-and-distribute.o \
    _src_ui_dialog_calligraphic-profile-rename.o \
    _src_ui_dialog_clonetiler.o \
    _src_ui_dialog_color-item.o \
    _src_ui_dialog_command-palette.o \
    _src_ui_dialog_attrdialog.o \
    _src_ui_dialog_dialog-base.o \
    _src_ui_dialog_dialog-container.o \
    _src_ui_dialog_dialog-data.o \
    _src_ui_dialog_dialog-manager.o \
    _src_ui_dialog_dialog-multipaned.o \
    _src_ui_dialog_dialog-notebook.o \
    _src_ui_dialog_dialog-window.o \
    _src_ui_dialog_document-properties.o \
    _src_ui_dialog_document-resources.o \
    _src_ui_dialog_export.o \
    _src_ui_dialog_export-batch.o \
    _src_ui_dialog_export-single.o \
    _src_ui_dialog_extensions-gallery.o \
    _src_ui_dialog_filedialog.o \
    _src_ui_dialog_filedialogimpl-gtkmm.o \
    _src_ui_dialog_fill-and-stroke.o \
    _src_ui_dialog_filter-effects-dialog.o \
    _src_ui_dialog_find.o \
    _src_ui_dialog_font-collections-manager.o \
    _src_ui_dialog_font-substitution.o \
    _src_ui_dialog_global-palettes.o \
    _src_ui_dialog_glyphs.o \
    _src_ui_dialog_grid-arrange-tab.o \
    _src_ui_dialog_guides.o \
    _src_ui_dialog_icon-preview.o \
    _src_ui_dialog_inkscape-preferences.o \
    _src_ui_dialog_knot-properties.o \
    _src_ui_dialog_layer-properties.o \
    _src_ui_dialog_livepatheffect-editor.o \
    _src_ui_dialog_lpe-fillet-chamfer-properties.o \
    _src_ui_dialog_lpe-powerstroke-properties.o \
    _src_ui_dialog_memory.o \
    _src_ui_dialog_messages.o \
    _src_ui_dialog_new-from-template.o \
    _src_ui_dialog_object-attributes.o \
    _src_ui_dialog_object-properties.o \
    _src_ui_dialog_objects.o \
    _src_ui_dialog_polar-arrange-tab.o \
    _src_ui_dialog_print.o \
    _src_ui_dialog_prototype.o \
    _src_ui_dialog_selectorsdialog.o \
    _src_ui_dialog_startup.o \
    _src_ui_dialog_styledialog.o \
    _src_ui_dialog_svg-fonts-dialog.o \
    _src_ui_dialog_swatches.o \
    _src_ui_dialog_symbols.o \
    _src_ui_dialog_paint-servers.o \
    _src_ui_dialog_text-edit.o \
    _src_ui_dialog_tile.o \
    _src_ui_dialog_tracedialog.o \
    _src_ui_dialog_transformation.o \
    _src_ui_dialog_undo-history.o \
    _src_ui_dialog_xml-tree.o \
    _src_ui_dialog_save-template-dialog.o \
    _src_ui_widget_iconrenderer.o \
    _src_ui_widget_alignment-selector.o \
    _src_ui_widget_anchor-selector.o \
    _src_ui_widget_bin.o \
    _src_ui_widget_completion-popup.o \
    _src_ui_widget_canvas.o \
    _src_ui_widget_canvas_stores.o \
    _src_ui_widget_canvas_synchronizer.o \
    _src_ui_widget_canvas_util.o \
    _src_ui_widget_canvas_texture.o \
    _src_ui_widget_canvas_texturecache.o \
    _src_ui_widget_canvas_pixelstreamer.o \
    _src_ui_widget_canvas_updaters.o \
    _src_ui_widget_canvas_framecheck.o \
    _src_ui_widget_canvas_glgraphics.o \
    _src_ui_widget_canvas_cairographics.o \
    _src_ui_widget_canvas_graphics.o \
    _src_ui_widget_canvas-grid.o \
    _src_ui_widget_canvas-notice.o \
    _src_ui_widget_color-entry.o \
    _src_ui_widget_color-notebook.o \
    _src_ui_widget_color-palette.o \
    _src_ui_widget_color-palette-preview.o \
    _src_ui_widget_color-picker.o \
    _src_ui_widget_color-preview.o \
    _src_ui_widget_color-scales.o \
    _src_ui_widget_color-slider.o \
    _src_ui_widget_combo-box-entry-tool-item.o \
    _src_ui_widget_combo-tool-item.o \
    _src_ui_widget_css-name-class-init.o \
    _src_ui_widget_custom-tooltip.o \
    _src_ui_widget_dash-selector.o \
    _src_ui_widget_desktop-widget.o \
    _src_ui_widget_entity-entry.o \
    _src_ui_widget_entry.o \
    _src_ui_widget_export-lists.o \
    _src_ui_widget_export-preview.o \
    _src_ui_widget_filter-effect-chooser.o \
    _src_ui_widget_fill-style.o \
    _src_ui_widget_font-button.o \
    _src_ui_widget_font-collection-selector.o \
    _src_ui_widget_font-list.o \
    _src_ui_widget_font-selector.o \
    _src_ui_widget_font-variants.o \
    _src_ui_widget_font-variations.o \
    _src_ui_widget_frame.o \
    _src_ui_widget_gradient-image.o \
    _src_ui_widget_gradient-editor.o \
    _src_ui_widget_gradient-selector.o \
    _src_ui_widget_gradient-vector-selector.o \
    _src_ui_widget_gradient-with-stops.o \
    _src_ui_widget_icon-combobox.o \
    _src_ui_widget_handle-preview.o \
    _src_ui_widget_image-properties.o \
    _src_ui_widget_imagetoggler.o \
    _src_ui_widget_ink-color-wheel.o \
    _src_ui_widget_ink-ruler.o \
    _src_ui_widget_ink-spinscale.o \
    _src_ui_widget_labelled.o \
    _src_ui_widget_layer-selector.o \
    _src_ui_widget_licensor.o \
    _src_ui_widget_marker-combo-box.o \
    _src_ui_widget_notebook-page.o \
    _src_ui_widget_object-composite-settings.o \
    _src_ui_widget_objects-dialog-cells.o \
    _src_ui_widget_oklab-color-wheel.o \
    _src_ui_widget_optglarea.o \
    _src_ui_widget_page-properties.o \
    _src_ui_widget_page-size-preview.o \
    _src_ui_widget_page-selector.o \
    _src_ui_widget_paint-selector.o \
    _src_ui_widget_pattern-editor.o \
    _src_ui_widget_point.o \
    _src_ui_widget_popover-bin.o \
    _src_ui_widget_popover-menu.o \
    _src_ui_widget_popover-menu-item.o \
    _src_ui_widget_preferences-widget.o \
    _src_ui_widget_random.o \
    _src_ui_widget_registered-widget.o \
    _src_ui_widget_registry.o \
    _src_ui_widget_rendering-options.o \
    _src_ui_widget_rotateable.o \
    _src_ui_widget_scalar-unit.o \
    _src_ui_widget_scalar.o \
    _src_ui_widget_scroll-utils.o \
    _src_ui_widget_selected-style.o \
    _src_ui_widget_shapeicon.o \
    _src_ui_widget_spin-scale.o \
    _src_ui_widget_spinbutton.o \
    _src_ui_widget_status-bar.o \
    _src_ui_widget_stroke-style.o \
    _src_ui_widget_style-subject.o \
    _src_ui_widget_style-swatch.o \
    _src_ui_widget_swatch-selector.o \
    _src_ui_widget_template-list.o \
    _src_ui_widget_text.o \
    _src_ui_widget_unit-menu.o \
    _src_ui_widget_unit-tracker.o \
    _src_ui_widget_widget-vfuncs-class-init.o \
    _src_ui_widget_xml-treeview.o \
    _src_ui_view_svg-view-widget.o \
    _src_widgets_sp-attribute-widget.o \
    _src_widgets_spw-utilities.o \
    _src_xml_composite-node-observer.o \
    _src_xml_croco-node-iface.o \
    _src_xml_event.o \
    _src_xml_log-builder.o \
    _src_xml_node-fns.o \
    _src_xml_node.o \
    _src_xml_node-iterators.o \
    _src_xml_quote.o \
    _src_xml_repr.o \
    _src_xml_repr-css.o \
    _src_xml_repr-io.o \
    _src_xml_repr-sorting.o \
    _src_xml_repr-util.o \
    _src_xml_simple-document.o \
    _src_xml_simple-node.o \
    _src_xml_subtree.o \
    _src_xml_helper-observer.o \
    _src_xml_rebase-hrefs.o \
    _src_xml_href-attribute-helper.o \
    _src_libnrtype_font-factory.o \
    _src_libnrtype_font-instance.o \
    _src_libnrtype_font-lister.o \
    _src_libnrtype_Layout-TNG.o \
    _src_libnrtype_Layout-TNG-Compute.o \
    _src_libnrtype_Layout-TNG-Input.o \
    _src_libnrtype_Layout-TNG-OutIter.o \
    _src_libnrtype_Layout-TNG-Output.o \
    _src_libnrtype_Layout-TNG-Scanline-Makers.o \
    _src_libnrtype_OpenTypeUtil.o \
    _src_libnrtype_style-attachments.o \
    _src_alignment-snapper.o \
    _src_attribute-rel-css.o \
    _src_attribute-rel-svg.o \
    _src_attribute-rel-util.o \
    _src_attribute-sort-util.o \
    _src_attributes.o \
    _src_auto-save.o \
    _src_axis-manip.o \
    _src_composite-undo-stack-observer.o \
    _src_conditions.o \
    _src_conn-avoid-ref.o \
    _src_console-output-undo-observer.o \
    _src_context-fns.o \
    _src_desktop-events.o \
    _src_desktop-style.o \
    _src_desktop.o \
    _src_distribution-snapper.o \
    _src_document-subset.o \
    _src_document-undo.o \
    _src_document.o \
    _src_event-log.o \
    _src_extract-uri.o \
    _src_file.o \
    _src_file-update.o \
    _src_filter-chemistry.o \
    _src_filter-enums.o \
    _src_gc-anchored.o \
    _src_gc-finalized.o \
    _src_gradient-chemistry.o \
    _src_gradient-drag.o \
    _src_guide-snapper.o \
    _src_grid-snapper.o \
    _src_id-clash.o \
    _src_inkscape.o \
    _src_inkscape-version-info.o \
    _src_layer-manager.o \
    _src_line-geometry.o \
    _src_line-snapper.o \
    _src_media.o \
    _src_message-context.o \
    _src_message-stack.o \
    _src_mod360.o \
    _src_object-hierarchy.o \
    _src_object-snapper.o \
    _src_page-manager.o \
    _src_path-chemistry.o \
    _src_path-prefix.o \
    _src_perspective-line.o \
    _src_preferences.o \
    _src_print.o \
    _src_proj_pt.o \
    _src_pure-transform.o \
    _src_rdf.o \
    _src_rubberband.o \
    _src_selcue.o \
    _src_selection-chemistry.o \
    _src_selection-describer.o \
    _src_selection.o \
    _src_seltrans-handles.o \
    _src_seltrans.o \
    _src_snap-preferences.o \
    _src_snap.o \
    _src_snapped-curve.o \
    _src_snapped-line.o \
    _src_snapped-point.o \
    _src_snapper.o \
    _src_style-internal.o \
    _src_style.o \
    _src_text-chemistry.o \
    _src_text-editing.o \
    _src_transf_mat_3x4.o \
    _src_unicoderange.o \
    _src_vanishing-point.o \
    _src_version.o \
    _src_pattern-manager.o \
    _src_pattern-manipulation.o \
    _src_inkscape-window.o \
    _src_inkscape-application.o \
    _src_actions_actions-effect-data.o \
    _src_actions_actions-extra-data.o \
    _src_actions_actions-hint-data.o \
    _src_actions_actions-base.o \
    _src_actions_actions-canvas-mode.o \
    _src_actions_actions-canvas-snapping.o \
    _src_actions_actions-canvas-transform.o \
    _src_actions_actions-dialogs.o \
    _src_actions_actions-edit-document.o \
    _src_actions_actions-edit-window.o \
    _src_actions_actions-edit.o \
    _src_actions_actions-effect.o \
    _src_actions_actions-element-a.o \
    _src_actions_actions-element-image.o \
    _src_actions_actions-file-window.o \
    _src_actions_actions-file.o \
    _src_actions_actions-helper.o \
    _src_actions_actions-helper-gui.o \
    _src_actions_actions-help-url.o \
    _src_actions_actions-hide-lock.o \
    _src_actions_actions-layer.o \
    _src_actions_actions-node-align.o \
    _src_actions_actions-object.o \
    _src_actions_actions-object-align.o \
    _src_actions_actions-output.o \
    _src_actions_actions-paths.o \
    _src_actions_actions-selection-object.o \
    _src_actions_actions-selection-window.o \
    _src_actions_actions-selection.o \
    _src_actions_actions-text.o \
    _src_actions_actions-tools.o \
    _src_actions_actions-tutorial.o \
    _src_actions_actions-transform.o \
    _src_actions_actions-undo-document.o \
    _src_actions_actions-view-mode.o \
    _src_actions_actions-view-window.o \
    _src_actions_actions-window.o \
    _src_actions_actions-pages.o \
    _src_actions_actions-svg-processing.o \
    _src_inkview-application.o \
    _src_inkview-window.o \
    _src_manipulation_copy-resource.o \
    generated_inkscape-version.o
END_MEASUREMENT



START_MEASUREMENT  'Compiling inkscape'
CFLAGS_MAIN="$CFLAGS"
CFLAGS_MAIN="$CFLAGS_MAIN $(pkg-config --cflags glibmm-2.68)"
CFLAGS_MAIN="$CFLAGS_MAIN $(pkg-config --cflags gtkmm-4.0)"
CFLAGS_MAIN="$CFLAGS_MAIN -I../src/3rdparty/2geom/include/"
CFLAGS_MAIN="$CFLAGS_MAIN -I../src/"
LDFLAGS="$LDFLAGS -L."
LDFLAGS="$LDFLAGS -Wl,-rpath ."
LDFLAGS="$LDFLAGS -Wl,--export-dynamic"
LDFLAGS="$LDFLAGS -rdynamic"
LDFLAGS="$LDFLAGS -l2geom"
LDFLAGS="$LDFLAGS -linkscape_base"
LDFLAGS="$LDFLAGS -lutil_LIB"
LDFLAGS="$LDFLAGS -lgc_LIB"
LDFLAGS="$LDFLAGS -ldepixelize_LIB"
LDFLAGS="$LDFLAGS -luemf_LIB"
LDFLAGS="$LDFLAGS -lautotrace_LIB"
LDFLAGS="$LDFLAGS -lavoid_LIB"
LDFLAGS="$LDFLAGS -lcola_LIB"
LDFLAGS="$LDFLAGS -lcroco_LIB"
LDFLAGS="$LDFLAGS -llivarot_LIB"
LDFLAGS="$LDFLAGS -lvpsc_LIB"
LDFLAGS="$LDFLAGS -lgc"
LDFLAGS="$LDFLAGS -lboost_filesystem"
LDFLAGS="$LDFLAGS -lpotrace"
LDFLAGS="$LDFLAGS -ldouble-conversion"
LDFLAGS="$LDFLAGS -lgio-2.0"
LDFLAGS="$LDFLAGS $(pkg-config --libs atk)"
LDFLAGS="$LDFLAGS $(pkg-config --libs gtk4)"
LDFLAGS="$LDFLAGS $(pkg-config --libs glib-2.0)"
LDFLAGS="$LDFLAGS $(pkg-config --libs glibmm-2.68)"
LDFLAGS="$LDFLAGS $(pkg-config --libs gtk4)"
LDFLAGS="$LDFLAGS $(pkg-config --libs gtkmm-4.0)"
LDFLAGS="$LDFLAGS $(pkg-config --libs libxml-2.0)"
LDFLAGS="$LDFLAGS $(pkg-config --libs sigc++-3.0)"
LDFLAGS="$LDFLAGS $(pkg-config --libs readline)"
LDFLAGS="$LDFLAGS $(pkg-config --libs poppler)"
LDFLAGS="$LDFLAGS $(pkg-config --libs poppler-glib)"
LDFLAGS="$LDFLAGS $(pkg-config --libs gsl)"
LDFLAGS="$LDFLAGS $(pkg-config --libs librevenge-stream-0.0)"
LDFLAGS="$LDFLAGS $(pkg-config --libs libvisio-0.1)"
LDFLAGS="$LDFLAGS $(pkg-config --libs libxslt)"
LDFLAGS="$LDFLAGS $(pkg-config --libs libwpg-0.3)"
LDFLAGS="$LDFLAGS $(pkg-config --libs libcdr-0.1)"
LDFLAGS="$LDFLAGS $(pkg-config --libs GraphicsMagick++)"
c++ $CFLAGS_MAIN \
    ../src/inkscape-main.cpp \
    -o inkscape \
    $LDFLAGS 
END_MEASUREMENT


popd
