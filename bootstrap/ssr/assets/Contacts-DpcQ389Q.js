import { jsxs, jsx } from "react/jsx-runtime";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-MDwtenIS.js";
import { usePage, useForm, router, Head } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { M as Modal, S as SecondaryButton } from "./SecondaryButton-B05Cq_fG.js";
import { I as InputLabel } from "./InputLabel-DDs2XNYP.js";
import { T as TextInput } from "./TextInput-D0qTZeQv.js";
import { P as PrimaryButton } from "./PrimaryButton-DDF1xnxF.js";
import { D as DangerButton } from "./DangerButton-YnwuyCoh.js";
import { I as InputError } from "./InputError-2JjWc6nJ.js";
import "./ApplicationLogo-xMpxFOcX.js";
import "@headlessui/react";
function Contacts() {
  const { isConnected, contacts = [], filters = {} } = usePage().props;
  const [search, setSearch] = useState(filters.search || "");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [deletingContact, setDeletingContact] = useState(null);
  const { data, setData, post, patch, delete: destroy, processing, errors, reset, clearErrors } = useForm({
    name: "",
    phone_number: "",
    tags: []
  });
  const { data: importData, setData: setImportData, post: postImport, processing: importing, errors: importErrors, reset: resetImport } = useForm({
    file: null
  });
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      router.get(route("whatsapp.contacts.index"), { search }, { preserveState: true, replace: true });
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [search]);
  const openAddModal = () => {
    reset();
    clearErrors();
    setIsAddModalOpen(true);
  };
  const openEditModal = (contact) => {
    setEditingContact(contact);
    setData({
      name: contact.name || "",
      phone_number: contact.phone_number,
      tags: contact.tags || []
    });
    clearErrors();
    setIsEditModalOpen(true);
  };
  const openDeleteModal = (contact) => {
    setDeletingContact(contact);
    setIsDeleteModalOpen(true);
  };
  const submitAdd = (e) => {
    e.preventDefault();
    post(route("whatsapp.contacts.store"), {
      onSuccess: () => {
        setIsAddModalOpen(false);
        reset();
      }
    });
  };
  const submitEdit = (e) => {
    e.preventDefault();
    patch(route("whatsapp.contacts.update", editingContact.id), {
      onSuccess: () => {
        setIsEditModalOpen(false);
        reset();
      }
    });
  };
  const submitDelete = (e) => {
    e.preventDefault();
    destroy(route("whatsapp.contacts.destroy", deletingContact.id), {
      onSuccess: () => setIsDeleteModalOpen(false)
    });
  };
  const submitImport = (e) => {
    e.preventDefault();
    postImport(route("whatsapp.contacts.import"), {
      onSuccess: () => {
        setIsImportModalOpen(false);
        resetImport();
      }
    });
  };
  const toggleTag = (tag) => {
    const currentTags = [...data.tags];
    const index = currentTags.indexOf(tag);
    if (index > -1) {
      currentTags.splice(index, 1);
    } else {
      currentTags.push(tag);
    }
    setData("tags", currentTags);
  };
  const presetTags = ["Hot Lead", "Student", "Follow Up", "Customer", "Spam"];
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200", children: "Contact Directory (CRM)" }),
        /* @__PURE__ */ jsxs("div", { className: "flex space-x-2", children: [
          /* @__PURE__ */ jsx(SecondaryButton, { onClick: () => setIsImportModalOpen(true), children: "Import CSV" }),
          /* @__PURE__ */ jsx(PrimaryButton, { onClick: openAddModal, children: "+ Add Contact" })
        ] })
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Contacts | Mini CRM" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800", children: /* @__PURE__ */ jsxs("div", { className: "p-6 text-gray-900 dark:text-gray-100", children: [
          !isConnected && /* @__PURE__ */ jsxs("div", { className: "mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded text-yellow-800 dark:text-yellow-200", children: [
            /* @__PURE__ */ jsx("p", { className: "font-semibold", children: "WhatsApp is not connected." }),
            /* @__PURE__ */ jsx("p", { className: "text-sm", children: "Connect your account for full automation features." })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex mb-6 space-x-4", children: /* @__PURE__ */ jsxs("div", { className: "flex-1 relative", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                placeholder: "Search by name or phone...",
                className: "w-full rounded-md border-gray-300 shadow-sm focus:border-[#1877F2] focus:ring-[#1877F2] dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300",
                value: search,
                onChange: handleSearch,
                disabled: !isConnected
              }
            ),
            search && /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setSearch(""),
                className: "absolute right-3 top-2.5 text-gray-400 hover:text-gray-600",
                children: "✕"
              }
            )
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200 dark:divide-gray-700", children: [
            /* @__PURE__ */ jsx("thead", { className: "bg-gray-50 dark:bg-gray-900/50", children: /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Name" }),
              /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Phone Number" }),
              /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Tags" }),
              /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Messages" }),
              /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Actions" })
            ] }) }),
            /* @__PURE__ */ jsxs("tbody", { className: "bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700", children: [
              contacts.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: "5", className: "px-6 py-8 text-center text-gray-500", children: "No contacts found." }) }),
              contacts.map((contact) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50 dark:hover:bg-gray-700/50 transition duration-150", children: [
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100", children: contact.name || /* @__PURE__ */ jsx("span", { className: "text-gray-400 italic", children: "Unknown" }) }),
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400", children: contact.phone_number }),
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm", children: /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1", children: contact.tags && contact.tags.map((tag) => /* @__PURE__ */ jsx("span", { className: "bg-gray-100 text-gray-700 text-[10px] px-1.5 py-0.5 rounded border border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600", children: tag }, tag)) }) }),
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: /* @__PURE__ */ jsx("span", { className: "bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-200", children: contact.message_count }) }),
                /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium", children: [
                  /* @__PURE__ */ jsx("button", { onClick: () => openEditModal(contact), className: "text-[#1877F2] hover:text-[#0c63d4] mr-3", children: "Edit" }),
                  /* @__PURE__ */ jsx("button", { onClick: () => openDeleteModal(contact), className: "text-red-600 hover:text-red-900", children: "Delete" })
                ] })
              ] }, contact.id))
            ] })
          ] }) })
        ] }) }) }) }),
        /* @__PURE__ */ jsx(Modal, { show: isAddModalOpen, onClose: () => setIsAddModalOpen(false), children: /* @__PURE__ */ jsxs("form", { onSubmit: submitAdd, className: "p-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900 dark:text-gray-100 mb-4", children: "Add New Contact" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "add_name", value: "Name" }),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  id: "add_name",
                  className: "mt-1 block w-full",
                  value: data.name,
                  onChange: (e) => setData("name", e.target.value)
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.name, className: "mt-2" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "add_phone", value: "Phone Number (with country code)" }),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  id: "add_phone",
                  className: "mt-1 block w-full",
                  value: data.phone_number,
                  onChange: (e) => setData("phone_number", e.target.value),
                  required: true
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.phone_number, className: "mt-2" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { value: "Tags" }),
              /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 mt-2", children: presetTags.map((tag) => /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => toggleTag(tag),
                  className: `px-3 py-1 rounded-full text-xs border transition ${data.tags.includes(tag) ? "bg-[#1877F2] text-white border-[#1877F2]" : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"}`,
                  children: tag
                },
                tag
              )) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-6 flex justify-end", children: [
            /* @__PURE__ */ jsx(SecondaryButton, { onClick: () => setIsAddModalOpen(false), children: "Cancel" }),
            /* @__PURE__ */ jsx(PrimaryButton, { className: "ms-3", disabled: processing, children: "Save Contact" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(Modal, { show: isEditModalOpen, onClose: () => setIsEditModalOpen(false), children: /* @__PURE__ */ jsxs("form", { onSubmit: submitEdit, className: "p-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900 dark:text-gray-100 mb-4", children: "Edit Contact" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "edit_name", value: "Name" }),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  id: "edit_name",
                  className: "mt-1 block w-full",
                  value: data.name,
                  onChange: (e) => setData("name", e.target.value)
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.name, className: "mt-2" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "edit_phone", value: "Phone Number" }),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  id: "edit_phone",
                  className: "mt-1 block w-full",
                  value: data.phone_number,
                  onChange: (e) => setData("phone_number", e.target.value),
                  required: true
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.phone_number, className: "mt-2" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { value: "Tags" }),
              /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 mt-2", children: presetTags.map((tag) => /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => toggleTag(tag),
                  className: `px-3 py-1 rounded-full text-xs border transition ${data.tags.includes(tag) ? "bg-[#1877F2] text-white border-[#1877F2]" : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"}`,
                  children: tag
                },
                tag
              )) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-6 flex justify-end", children: [
            /* @__PURE__ */ jsx(SecondaryButton, { onClick: () => setIsEditModalOpen(false), children: "Cancel" }),
            /* @__PURE__ */ jsx(PrimaryButton, { className: "ms-3", disabled: processing, children: "Update Contact" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(Modal, { show: isDeleteModalOpen, onClose: () => setIsDeleteModalOpen(false), children: /* @__PURE__ */ jsxs("form", { onSubmit: submitDelete, className: "p-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900 dark:text-gray-100", children: "Are you sure?" }),
          /* @__PURE__ */ jsxs("p", { className: "mt-1 text-sm text-gray-600 dark:text-gray-400", children: [
            "This will permanently delete the contact for ",
            deletingContact?.phone_number,
            ". This action cannot be undone."
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-6 flex justify-end", children: [
            /* @__PURE__ */ jsx(SecondaryButton, { onClick: () => setIsDeleteModalOpen(false), children: "Cancel" }),
            /* @__PURE__ */ jsx(DangerButton, { className: "ms-3", disabled: processing, children: "Delete Contact" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(Modal, { show: isImportModalOpen, onClose: () => setIsImportModalOpen(false), children: /* @__PURE__ */ jsxs("form", { onSubmit: submitImport, className: "p-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900 dark:text-gray-100 mb-4", children: "Import Contacts from CSV" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mb-4", children: 'Upload a CSV file with "name" and "phone" headings.' }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "file",
              accept: ".csv",
              onChange: (e) => setImportData("file", e.target.files[0]),
              className: "block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: importErrors.file, className: "mt-2" }),
          /* @__PURE__ */ jsxs("div", { className: "mt-6 flex justify-end", children: [
            /* @__PURE__ */ jsx(SecondaryButton, { onClick: () => setIsImportModalOpen(false), children: "Cancel" }),
            /* @__PURE__ */ jsx(PrimaryButton, { className: "ms-3", disabled: importing, children: "Start Import" })
          ] })
        ] }) })
      ]
    }
  );
}
export {
  Contacts as default
};
