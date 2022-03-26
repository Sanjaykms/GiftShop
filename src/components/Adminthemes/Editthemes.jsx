import React from "react";
import { useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { useThemeCxt } from "../Assets/themes-context";

export default function EditPage({ item, onEditTheme, cou }) {
  const themeCxt = useThemeCxt();
  const [editThemeName, setEditThemeName] = useState(item.themeName);
  const [editCost, setEditCost] = useState(item.price);
  const [editThemeDesc, setEditThemeDesc] = useState(item.themeDesc);

  const onEdit = (e) => {
    e.preventDefault();
    const updatedProduct = {
      id: item.id,
      themeName: editThemeName,
      price: editCost,
      themeDesc: editThemeDesc,
    };
    themeCxt.themeDispatchFn({
      type: "EDIT_PRODUCT",
      value: updatedProduct,
    });
    alert("Theme deatails edited successfully!");
  };

  return (
    <div>
      <MdModeEdit
        data-bs-toggle="modal"
        data-bs-target={"#modal" + cou}
        id={"editProduct" + cou}
        color="blue"
        style={{
          height: "25px",
          width: "25px",
          marginLeft: "10px",
          cursor: "pointer",
        }}
      />
      <div className="modal" id={"modal" + cou} style={{marginTop:"100px"}}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Theme</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <form onSubmit={onEdit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label>Theme Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter the theme name"
                    defaultValue={item.themeName}
                    onChange={(e) => setEditThemeName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label>Theme Cost</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter the Theme price"
                    defaultValue={item.price}
                    onChange={(e) => setEditCost(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label>Theme Description</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter the theme description"
                    defaultValue={item.themeDesc}
                    onChange={(e) => setEditThemeDesc(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn btn-success"
                  data-bs-dismiss="modal"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}