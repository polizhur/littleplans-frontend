import ActivityForm from "../components/ActivityForm";
import { useState } from "react";
export default function MyProfile() {
  const [formOpen, setFormOpen] = useState(true);
  return (
    <div class="container">
      <div class="mt-5 mb-5 col-md-6 offset-md-3">
        <button
          onClick={() => setFormOpen(!formOpen)}
          className="btn btn-primary"
        >
          Add an Activity
        </button>
        {formOpen && <ActivityForm />}
      </div>
    </div>
  );
}
